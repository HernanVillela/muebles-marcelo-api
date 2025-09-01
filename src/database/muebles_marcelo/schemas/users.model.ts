import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: false, // porque ya usás campos created y modified manuales
})
export class UsersModel extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: false
  })
  last_name: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: true
  })
  active: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  role_id: number;
}