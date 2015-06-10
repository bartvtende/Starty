module.exports = function(sequelize, DataTypes) {

    return sequelize.define('Organizations', {
        name: DataTypes.STRING
    });

};