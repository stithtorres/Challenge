import Sequelize from 'sequelize';
import {sequelize} from '../database/connection';

const RanksModel = sequelize.define('ranks',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    value: {type: Sequelize.INTEGER},
    movie_id: {type:Sequelize.INTEGER},
    user_id:{type:Sequelize.INTEGER}
},{timestamps: false});

export default RanksModel;