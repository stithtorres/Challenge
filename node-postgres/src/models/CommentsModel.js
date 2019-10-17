import Sequelize from 'sequelize';
import {sequelize} from '../database/connection';

const CommentsModel = sequelize.define('comments',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    comment: {type: Sequelize.TEXT},
    movie_id: {type:Sequelize.INTEGER},
    user_name: {type:Sequelize.TEXT},
    user_id:{type:Sequelize.INTEGER}
},{timestamps: false});

export default CommentsModel;