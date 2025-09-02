// 代码生成时间: 2025-09-02 13:26:34
(function() {

  // Define the Notification class
  class Notification {
    constructor(options) {
      this.id = options.id;
      this.message = options.message;
      this.type = options.type || 'info'; // Default type is 'info'
      this.timeout = options.timeout || 5000; // Default timeout is 5000ms
    }

    // Render the notification to the DOM
    render() {
      const notificationDiv = document.createElement('div');
      notificationDiv.id = `notification-${this.id}`;
      notificationDiv.className = `notification ${this.type}`;
      notificationDiv.textContent = this.message;
      document.body.appendChild(notificationDiv);

      // Remove the notification after timeout
      setTimeout(() => {
        notificationDiv.remove();
      }, this.timeout);
    }
  }

  // Define the NotificationManager class
  class NotificationManager {
    constructor() {
      this.notifications = [];
    }

    // Add a new notification
    addNotification(options) {
      if (!options.id || !options.message) {
        throw new Error('Notification must have an id and a message');
      }

      // Check if notification with the same id already exists
      const existingNotification = this.notifications.find(n => n.id === options.id);
      if (existingNotification) {
        throw new Error('Notification with the same id already exists');
      }

      const notification = new Notification(options);
      this.notifications.push(notification);
      notification.render();
    }
  }

  // Expose the NotificationManager to the global scope
  window.NotificationManager = new NotificationManager();

})();
