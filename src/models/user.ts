// models/user.ts
import { Sequelize, DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';

// Interface đại diện cho các field của User
interface IUserAttributes {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address?: string;
  phoneNumber?: string;
  gender?: boolean;
  image?: string;
  roleId?: string;
  positionId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Đối với create, một số field là optional
interface IUserCreationAttributes
  extends Optional<
    IUserAttributes,
    | 'id'
    | 'address'
    | 'phoneNumber'
    | 'gender'
    | 'image'
    | 'roleId'
    | 'positionId'
    | 'createdAt'
    | 'updatedAt'
  > {}

// Model class
export class UserModel
  extends Model<IUserAttributes, IUserCreationAttributes>
  implements IUserAttributes
{
  declare id: number;
  declare email: string;
  declare password: string;
  declare firstName: string;
  declare lastName: string;

  // nên để kiểu có thể null thay vì optional để khớp DB nullable
  declare address?: string;
  declare phoneNumber?: string;
  declare gender?: boolean;
  declare image?: string;
  declare roleId?: string;
  declare positionId?: string;

  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;

  // Associations
  static associate(models: any) {
    // Định nghĩa quan hệ nếu có
  }
}

// Hàm khởi tạo model
export const UserModelInit = (
  sequelize: Sequelize,
  dataTypes: typeof DataTypes
) => {
  UserModel.init(
    {
      id: {
        type: dataTypes.INTEGER, // id kiểu số
        autoIncrement: true, // tự tăng
        primaryKey: true,
      },
      email: { type: dataTypes.STRING, allowNull: false },
      password: { type: dataTypes.STRING, allowNull: false },
      firstName: { type: dataTypes.STRING, allowNull: false },
      lastName: { type: dataTypes.STRING, allowNull: false },
      address: dataTypes.STRING,
      phoneNumber: dataTypes.STRING,
      gender: dataTypes.BOOLEAN,
      image: dataTypes.STRING,
      roleId: dataTypes.STRING,
      positionId: dataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
    }
  );
  return UserModel;
};
