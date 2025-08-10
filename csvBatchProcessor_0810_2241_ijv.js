// 代码生成时间: 2025-08-10 22:41:27
const fs = require('fs');
const d3 = require('d3-dsv');

/**
 * 处理CSV文件的函数
 * @param {string} filePath - CSV文件的路径
 * @param {function} processData - 用于处理每行数据的回调函数
 * @returns {Promise<void>} - 处理完毕的Promise
 */
function processCSVFile(filePath, processData) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        // 错误处理
        return reject(err);
      }
      // 解析CSV数据
      const records = d3.csvParse(data);
      // 逐行处理数据
      records.forEach(record => {
        processData(record);
      });
      // 处理完毕
      resolve();
    });
  });
}

/**
 * 将处理后的数据写回CSV文件
 * @param {string} outputPath - 输出文件路径
 * @param {Array<Object>} data - 需要写入的数据数组
 * @returns {Promise<void>} - 写入完毕的Promise
 */
function writeToCSV(outputPath, data) {
  return new Promise((resolve, reject) => {
    // 将数据转换为CSV字符串
    const csvString = d3.csvFormat(data);
    // 写入CSV文件
    fs.writeFile(outputPath, csvString, err => {
      if (err) {
        // 错误处理
        return reject(err);
      }
      // 写入完毕
      resolve();
    });
  });
}

/**
 * 主函数，用于处理CSV文件批量操作
 * @param {Array<string>} filePaths - CSV文件路径数组
 * @param {function} processData - 处理数据的回调函数
 * @param {string} outputPath - 输出文件路径
 * @returns {Promise<void>} - 所有操作完成的Promise
 */
function processCSVBatch(filePaths, processData, outputPath) {
  return filePaths.reduce((promiseChain, currentFilePath) => {
    return promiseChain.then(() => {
      return processCSVFile(currentFilePath, processData);
    }).catch(error => {
      // 输出错误信息并跳过当前文件
      console.error(`Error processing file ${currentFilePath}: ${error.message}`);
    });
  }, Promise.resolve()).then(() => {
    // 所有文件处理完毕后，将数据写入输出文件
    const allData = filePaths.map(filePath => {
      // 假设每个文件处理后都能返回一个数据数组
      return processData(filePath);
    }).flat();
    return writeToCSV(outputPath, allData);
  });
}

// 示例用法
const filePaths = ['path/to/file1.csv', 'path/to/file2.csv'];
const outputPath = 'path/to/output.csv';

// 假设processData是一个简单的数据转换函数
const processData = (record) => {
  // 这里可以添加具体的数据处理逻辑
  return { ...record, processed: true };
};

processCSVBatch(filePaths, processData, outputPath)
  .then(() => console.log('CSV batch processing completed successfully.'))
  .catch(error => console.error('Error during CSV batch processing:', error));