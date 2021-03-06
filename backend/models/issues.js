module.exports = function(sequelize, DataTypes) {

    var Issues = sequelize.define('issues', {
        id: DataTypes.STRING,
        project_id: DataTypes.STRING,
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        status: DataTypes.STRING,
        type: DataTypes.STRING,
        priority: DataTypes.STRING,
        time_expected: DataTypes.INTEGER,
        time_reality: DataTypes.INTEGER,
        creator: DataTypes.INTEGER,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    });

    return Issues;
};