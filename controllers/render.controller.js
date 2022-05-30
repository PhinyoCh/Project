const {getUserData, getUsername, getUserRole, getName, getEmail } = require('../utils/initial');

module.exports = {
    renderLogin : function (req, res, next){
        res.render('login');
    },
    renderIndex : function (req, res, next){
        res.render('index', {username : getUsername(req), role : getUserRole(req)});
    },
    renderProfile : function (req, res, next){
        res.render('profile', {username : getUsername(req), role : getUserRole(req), name : getName(req), email : getEmail(req)});
    },
    renderReport : function (req, res, next){
        res.render('report', {username : getUsername(req), role : getUserRole(req)});
    },
    renderUserManage : function (req, res, next){
        res.render('user_manage', {username : getUsername(req), role : getUserRole(req)});
    },
    renderSoundManage : function (req, res, next){
        res.render('sound_manage', {username : getUsername(req), role : getUserRole(req)});
    },


}
