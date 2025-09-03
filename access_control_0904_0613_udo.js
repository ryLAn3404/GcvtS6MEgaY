// 代码生成时间: 2025-09-04 06:13:14
const d3 = require('d3');

// 定义访问权限控制类
class AccessControl {

    // 构造函数
    constructor() {
        this.permissions = {};
    }

    // 添加权限
    addPermission(permissionName, roles) {
        // 检查参数类型
        if (typeof permissionName !== 'string' || !Array.isArray(roles)) {
            throw new Error('Invalid arguments: permissionName must be a string and roles must be an array');
        }
        this.permissions[permissionName] = roles;
    }

    // 检查用户是否有权限
    hasPermission(userRole, permissionName) {
        // 检查参数类型
        if (!permissionName || typeof permissionName !== 'string' || !userRole) {
            throw new Error('Invalid arguments: permissionName must be a string and userRole must be provided');
        }
        // 获取权限对应的角色列表
        const roles = this.permissions[permissionName];
        if (!roles) {
            throw new Error(`Permission '${permissionName}' not found`);
        }
        // 检查用户角色是否在角色列表中
        return roles.includes(userRole);
    }

    // 显示所有权限
    showPermissions() {
        console.log('Available permissions:', this.permissions);
    }
}

// 创建访问权限控制实例
const accessControl = new AccessControl();

// 添加权限
accessControl.addPermission('edit', ['admin', 'editor']);
accessControl.addPermission('view', ['admin', 'editor', 'viewer']);

// 检查权限
try {
    console.log('User has edit permission:', accessControl.hasPermission('editor', 'edit'));
    console.log('User has view permission:', accessControl.hasPermission('viewer', 'view'));
    console.log('User has delete permission:', accessControl.hasPermission('admin', 'delete'));
} catch (error) {
    console.error(error.message);
}

// 显示所有权限
accessControl.showPermissions();