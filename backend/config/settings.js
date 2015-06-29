module.exports = {

    mongoHost: process.env.mongoHost || '127.0.0.1:27017',
    mongoDatabase: 'starty',

    sqlHost: process.env.sqlHost || '127.0.0.1',
    sqlUsername: process.env.sqlUsername || 'root',
    sqlPassword: process.env.sqlPassword || '',
    sqlDatabase: process.env.sqlDatabase || 'starty',

    appPort: 1337,

    tokenSecret: 'Dikke vette piemol die vind Jerke wel lekker, deze string mag je niet veranderen hihi',

    githubClientId: 'ffb229d6119ca88e6e8c',
    githubClientSecret: '8975f269f7cf457b55ce576960daaeb6a283df94',

    baseUrl: process.env.baseUrl || 'http://localhost:1337/api',

    graphUrl: process.env.graphUrl || 'http://localhost:8080/starty.gen/api/request/graph'

};