module.exports = function(sequelize, DataTypes) {

    var Providers = sequelize.define('providers', {
        user_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        access_token: DataTypes.STRING,
        image: DataTypes.STRING
    });

    return Providers;
};