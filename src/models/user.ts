// models/user.ts
import { Sequelize, DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';

// Interface đại diện cho các field của User
interface IUserAttributes {
  id: string;
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
  public id!: string;
  public email!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public address?: string;
  public phoneNumber?: string;
  public gender?: boolean;
  public image?: string;
  public roleId?: string;
  public positionId?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

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
        type: dataTypes.UUID,
        defaultValue: dataTypes.UUIDV4,
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
      tableName: 'Users',
      timestamps: true,
    }
  );
  return UserModel;
};
