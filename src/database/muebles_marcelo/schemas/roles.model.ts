import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'roles',
  timestamps: false, // porque ya usás campos created y modified manuales
})
export class RolesModel extends Model {
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
}