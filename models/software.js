'use strict';

module.exports = (sequelize, DataTypes) => {
    var Software = sequelize.define('software', {
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: true,

        underscored: true,

        classMethods: {
            associate: (models) => {
                Software.belongsTo(models.company, {
                    onDelete: 'CASCADE'
                });
            }
        }
    });

    return Software;
};