// 代码生成时间: 2025-08-16 21:00:33
// 引入D3模块
const d3 = require('d3');

// 文件夹结构整理器类
class FolderStructureOrganizer {
  /**
   * 构造函数，初始化根目录
   * @param {string} rootPath - 根目录的路径
   */
  constructor(rootPath) {
    this.rootPath = rootPath;
  }

  /**
   * 获取文件夹结构的树形数据
   * @returns {Promise} - 包含文件夹结构的Promise对象
   */
  async getFolderStructure() {
    try {
      // 使用D3的hierarchy方法来构建文件夹结构
      const folders = await this._getFoldersHierarchy(this.rootPath);
      return d3.hierarchy(folders, (folder) => folder.children)
        .sum(d => d.size)
        .sort((a, b) => b.height - a.height || b.data.name.localeCompare(a.data.name));
    } catch (error) {
      console.error('Error getting folder structure:', error);
      throw error;
    }
  }

  /**
   * 递归获取文件夹及其子文件夹的信息
   * @param {string} path - 当前文件夹的路径
   * @returns {Promise} - 包含文件夹信息的Promise对象
   */
  async _getFoldersHierarchy(path) {
    const fs = require('fs');
    const pathModule = require('path');
    
    const items = await new Promise((resolve, reject) => {
      fs.readdir(path, { withFileTypes: true }, (err, items) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(items);
      });
    });
    
    const folders = [];
    for (const item of items) {
      if (item.isDirectory()) {
        const folder = {
          name: item.name,
          children: [
            // 递归调用以获取子文件夹信息
            ...(await this._getFoldersHierarchy(pathModule.join(path, item.name))).map(d => ({ name: d.name, size: d.size })),
          ]
        };
        folders.push(folder);
      } else {
        // 处理文件
        folders.push({ name: item.name, size: item.size });
      }
    }
    return folders;
  }
}

// 使用示例
(async () => {
  try {
    const organizer = new FolderStructureOrganizer('/path/to/your/folder');
    const folderStructure = await organizer.getFolderStructure();
    console.log(folderStructure);
  } catch (error) {
    console.error('Error organizing folder structure:', error);
  }
})();