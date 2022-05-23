const server_config = {};

server_config.port = 5000; 
server_config.url = 'http://localhost:'+ server_config.port +'/';
server_config.cookie_options = {
    maxAge: 86400 * 1000, // 24 hours
    httpOnly: true, // http only, prevents JavaScript cookie access
    secure: true, // cookie must be sent over https / ssl
    path:"/"
}
server_config.cookie_test = {
    maxAge: 60 * 1000, // 1 minute
    httpOnly: true, // http only, prevents JavaScript cookie access
    secure: true, // cookie must be sent over https / ssl
    path:"/"
}

module.exports = server_config;