// 代码生成时间: 2025-09-06 08:22:04
const AccessControl = (function() {

  // This object holds the permissions for different roles
  const permissions = {
    admin: ['read', 'write', 'delete'],
    user: ['read'],
    guest: []
  };

  /**
   * Checks if a user has the necessary permissions to perform an action.
   * 
   * @param {string} role - The user's role
   * @param {string} action - The action to be performed
   * @returns {boolean} - True if the user has permission, false otherwise
   */
  function hasPermission(role, action) {
    // Check if the role exists in the permissions object
    if (!permissions[role]) {
      throw new Error('Invalid role');
    }

    // Check if the action is allowed for the user's role
    return permissions[role].includes(action);
  }

  return {
    hasPermission
  };
})();

// Usage example
try {
  const role = 'admin';
  const action = 'write';
  const canPerformAction = AccessControl.hasPermission(role, action);
  console.log(`User with role ${role} can ${canPerformAction ? '' : 'not '}perform the action ${action}.`);
} catch (error) {
  console.error(error.message);
}
