module.exports = function(sequelize, DataTypes) {

    var Projects = sequelize.define('Projects', {
        organization_id: DataTypes.INTEGER,
        shortcode: DataTypes.STRING,
        name: DataTypes.STRING,
        description: DataTypes.STRING
    });

    return Projects;
};