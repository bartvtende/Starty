module.exports = function (sequelize, DataTypes) {

    var ProjectUser = sequelize.define('project_users', {
        UID: {
            type: DataTypes.INTEGER
        },
        PID: {
            type: DataTypes.INTEGER
        }
    });

    return ProjectUser;
};