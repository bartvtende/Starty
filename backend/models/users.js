module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Users', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    }, {
        instanceMethods: {
            countTasks: function() {
                // how to implement this method ?
            }
        }
    });
};