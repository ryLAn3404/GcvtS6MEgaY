// 代码生成时间: 2025-09-15 08:59:38
const AccessControl = (function() {

  // Define user roles and their permissions
  const permissions = {
    admin: ['read', 'write', 'delete'],
    user: ['read'],
    guest: []
  };

  // Check if a user has a specific permission
  function hasPermission(userRole, permission) {
    // Check if the user's role exists
    if (!permissions[userRole]) {
      throw new Error('Invalid user role');
    }
    // Check if the permission exists for the user's role
    return permissions[userRole].includes(permission);
  }

  // Public API
  return {
    hasPermission: hasPermission
  };

})();

/**
 * Usage example
 *
 * try {
 *   if (AccessControl.hasPermission('admin', 'write')) {
 *     console.log('User has write permission');
 *   } else {
 *     console.log('User does not have write permission');
 *   }
 * } catch (error) {
 *   console.error('Access Control Error:', error.message);
 * }
 */