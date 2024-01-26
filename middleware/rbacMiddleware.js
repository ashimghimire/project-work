     // middleware/rbacMiddleware.js

    const Role = require('../models/role');
    const Permissions = require('../models/permission');

    // Check if the user has the required permission for a route
    exports.checkPermission = (permission) => {
    return (req, res, next) => {
        const userRole = req.user ? req.user.role : 'anonymous';
        const userPermissions = new Permissions().getPermissionsByRoleName(userRole);

        if (userPermissions.includes(permission)) {
        return next();
        } else {
        return res.status(403).json({ error: 'Access denied' });
        }
    };
    };

    exports.checkRole=(role) => { return (req, res, next)=>{
        const roles = new Role().getRoles();
        if(roles.includes(role)){
            return next();
        } else {
        return res.status(403).json({ error: 'Access denied' });
        }
    }

}