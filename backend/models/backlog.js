module.exports = function(sequelize, DataTypes) {

    var Backlog = sequelize.define('backlog_items', {
        id: DataTypes.STRING,
        project_id: DataTypes.STRING,
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        status: DataTypes.STRING,
        time_expected: DataTypes.INTEGER,
        time_reality: DataTypes.INTEGER,
        creator: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    });

    return Backlog;
};