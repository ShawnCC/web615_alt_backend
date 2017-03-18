'use strict';

module.exports = (sequelize, DataTypes) => {
    var Company = sequelize.define('company', {
        name: {
            type: DataTypes.STRING
        },
        api_key: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        }
    }, {
        timestamps: true,

        underscored: true,

        classMethods: {
            associate: (models) => {
                Company.hasMany(models.software, {
                    onDelete: 'CASCADE'
                });
            }
        },

        hooks: {
            beforeCreate: (instance) => {
                instance.api_key = Date.now().toString();
            }
        }
    });

    return Company;
};