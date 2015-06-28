module.exports = function(sequelize, DataTypes) {

    var Projects = sequelize.define('projects', {
        organization_id: DataTypes.INTEGER,
        shortcode: DataTypes.STRING,
        name: DataTypes.STRING,
        description: DataTypes.STRING
    });

    return Projects;
};