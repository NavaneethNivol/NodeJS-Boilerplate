var config = require("../../config/config");

module.exports = (sequelize, DataTypes) => {
    const login = sequelize.define('login', {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },

        org_id: { 
            type:DataTypes.BIGINT 
        },

        role: { 
            type: DataTypes.TEXT, defaultValue: "user" 
        },
        
        first_name: { 
            type: DataTypes.TEXT 
        },

        middle_name: { 
            type: DataTypes.TEXT 
        },

        last_name: { 
            type: DataTypes.TEXT 
        },

        email: { 
            type: DataTypes.TEXT 
        },

        mobile: { 
            type: DataTypes.TEXT 
        },

        password: { 
            type: DataTypes.TEXT 
        },

        salt: { 
            type: DataTypes.TEXT 
        },

        sex: { 
            type: DataTypes.INTEGER 
        },
        /**
         * 1: male
         * 2: female
         * 3: other
         */
        address: { 
            type: DataTypes.JSONB 
        },

        other_data: { 
            type: DataTypes.JSONB 
        },

        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE
    }, {
            underscored: true
        });

    return login;
};
