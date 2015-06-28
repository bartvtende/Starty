module.exports = function(sequelize, DataTypes) {

    return sequelize.define('organizations', {
        name: DataTypes.STRING
    });

};