import Sequelize from 'sequelize';
import {sequelize} from '../database/connection';

import RanksModel from './RanksModel';
import CommentsModel from './CommentsModel';

const UsersModel = sequelize.define('users',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    name: {type: Sequelize.TEXT},
    email: {type:Sequelize.TEXT},
    password:{type:Sequelize.TEXT}
},{timestamps: false});

UsersModel.hasMany(RanksModel,{ foreingKey: 'user_id', sourceKey: 'id'});
RanksModel.belongsTo(UsersModel,{ foreingKey: 'user_id', sourceKey: 'id'});

UsersModel.hasMany(CommentsModel,{ foreingKey: 'user_id', sourceKey: 'id'});
CommentsModel.belongsTo(UsersModel,{ foreingKey: 'user_id', sourceKey: 'id'});

export default UsersModel;