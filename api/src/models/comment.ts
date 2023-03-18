import { DataTypes, Model } from 'sequelize';
import db from '../db';
import { User } from './user';

export class Comment extends Model {
  declare id: number;
  declare userId: number;
  declare file: string;
  declare text: string;
  declare parentId: number;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    file: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    }
  },
  { sequelize: db }
);

Comment.belongsTo(User, { as: 'user' }); // TODO: make userId required
Comment.hasMany(Comment, { foreignKey: 'parentId', as: 'subComments' });
