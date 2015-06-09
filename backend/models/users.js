module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Users', {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING
    }, {
        instanceMethods: {
            countTasks: function() {
                // how to implement this method ?
            }
        }
    });
};