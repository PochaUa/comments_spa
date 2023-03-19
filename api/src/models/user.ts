import { DataTypes, Model } from 'sequelize';
import db from '../db';

export class User extends Model {
  declare id: number;
  declare username: string;
  declare password: string;
  declare homePage: string;
  declare email: string;
  declare avatar: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    homePage: { type: DataTypes.STRING, allowNull: true, unique: false },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: false
    }
  },
  { sequelize: db }
);
