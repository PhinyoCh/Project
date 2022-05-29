const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const validation = require('../middleware/validation.middleware')
const initialController = require('../controllers/initial.controller');

router.get('/', validation.isAuth, validation.isAdminRoute, initialController.renderUserManage);

router.post("/AddUserAccount",  UserController.regisUser);

router.post("/PostRemoveUser", validation.isAdminRoute, UserController.removeUser);

router.post("/PostEditUser", validation.isAdminRoute, UserController.editUser);

router.post("/searchUser", validation.isAdminRoute, UserController.searchUser);

module.exports = router;