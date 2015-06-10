module.exports = function(sequelize, DataTypes) {

    var Users = sequelize.define('Users', {
        organization_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    });

    return Users;
};