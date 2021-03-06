import Sequelize from 'sequelize';

// this is the configuration for DB, the data must be hidden

export const sequelize = new Sequelize(
    'cafeto_challenge',
    'postgres',
    'root',
    {
        host: 'localhost',
        dialect: 'postgres',
        pool:{
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000
        },
        loggin:false
    }
);

