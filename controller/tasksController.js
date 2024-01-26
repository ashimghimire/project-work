
const Permission = require('../models/permission');

function hasPermission(permission) {

  return (req, res, next) => {
    const userRoles = req.user.roles;
    
    if (userRoles.includes('admin')) {
      next();
    } else {
      const userPermissions = Permission.find({
        role: { $in: userRoles }
      });

      if (userPermissions.includes(permission)) {
        next();
      } else {
        res.status(403).json({ message: 'Forbidden' });
      }
    }
  }

}

exports.getAllTasks = [
  hasPermission('tasks:list')
], (req, res) => {
  res.json({ message: 'List of tasks'})
};

exports.createTask = [
  hasPermission('tasks:create')  
], (req, res) => {
  res.json({ message: 'Task created' });
};

exports.updateTask = [
  hasPermission('tasks:update')
], (req, res) => {
  res.json({ message: 'Task updated' });
}; 

exports.deleteTask = [
  hasPermission('tasks:delete') 
], (req, res) => {
  res.json({ message: 'Task deleted' });
};