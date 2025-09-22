// 代码生成时间: 2025-09-23 01:00:28
// Scheduler class definition
class Scheduler {
  constructor() {
    this.tasks = []; // Array to hold scheduled tasks
  }

  /**
   * Schedule a new task to be executed at a specified time
   * @param {string} taskId - Unique identifier for the task
   * @param {number} delay - Delay in milliseconds before the task is executed
   * @param {Function} action - The function to be executed
   */
  scheduleTask(taskId, delay, action) {
    if (typeof action !== 'function') {
      throw new Error('The action must be a function.');
    }

    const task = {
      id: taskId,
      delay: delay,
      action: action,
      timerId: null
    };

    task.timerId = setTimeout(() => {
      action();
      this.tasks = this.tasks.filter(t => t.id !== taskId); // Remove the task after execution
    }, delay);

    this.tasks.push(task); // Add the task to the schedule
  }

  /**
   * Cancel a scheduled task by its ID
   * @param {string} taskId - The unique identifier for the task to cancel
   */
  cancelTask(taskId) {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      clearTimeout(task.timerId);
      this.tasks = this.tasks.filter(t => t.id !== taskId); // Remove the task from the schedule
    } else {
      console.warn(`Task with ID ${taskId} not found.`);
    }
  }

  /**
   * Display the current schedule in the console
   */
  displaySchedule() {
    console.log('Current Schedule:', this.tasks);
  }
}

// Example usage of the Scheduler
const scheduler = new Scheduler();

// Schedule a task to be executed after 2 seconds
scheduler.scheduleTask('task1', 2000, () => {
  console.log('Task 1 executed');
});

// Schedule a task to be executed after 5 seconds
scheduler.scheduleTask('task2', 5000, () => {
  console.log('Task 2 executed');
});

// Display the current schedule
scheduler.displaySchedule();

// Cancel the first task if needed
// scheduler.cancelTask('task1');