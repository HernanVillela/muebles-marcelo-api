import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'client',
  timestamps: false, // porque ya usás campos created y modified manuales
})
export class ClientModel extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    defaultValue: 'unknown',
  })
  alias_name: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: true,
  })
  color: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
  })
  language_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'clients_types_id',
    defaultValue: 1,
  })
  clients_types_id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  retail_grouped: string;

  @Column({
    type: DataType.TINYINT,
    allowNull: false,
    defaultValue: 0,
  })
  show_room: number;

  @Column({
    type: DataType.TINYINT,
    allowNull: false,
    defaultValue: 1,
  })
  has_retail_categories: number;

  @Column({
    type: DataType.TINYINT,
    allowNull: false,
    defaultValue: 0,
  })
  view_alter_name_retail: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  paic: boolean;

  @Column({
    type: DataType.TINYINT,
    allowNull: false,
    defaultValue: 0,
  })
  has_pack_feature: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
  })
  associative_match: boolean;

  @Column({
    type: DataType.TINYINT,
    allowNull: false,
    defaultValue: 0,
  })
  allow_unlinked_match: number;

  @Column({
    type: DataType.TINYINT,
    allowNull: false,
    defaultValue: 0,
  })
  active_products_only: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: 1,
  })
  show_card_price: boolean;

  @Column({
    type: DataType.TINYINT,
    allowNull: true,
    defaultValue: 0,
  })
  force_card_price: number;

  @Column({
    type: DataType.TINYINT,
    allowNull: true,
    defaultValue: 0,
  })
  show_cash_price: number;

  @Column({
    type: DataType.TINYINT,
    allowNull: true,
    defaultValue: 0,
  })
  show_ean: number;

  @Column({
    type: DataType.TINYINT,
    allowNull: true,
    defaultValue: 0,
  })
  show_web_varieties_description: number;

  @Column({
    type: DataType.TINYINT,
    allowNull: true,
    defaultValue: 0,
  })
  other_prices: number;

  @Column({
    type: DataType.TINYINT,
    allowNull: false,
    defaultValue: 1,
  })
  active: number;

  @Column({
    type: DataType.STRING(55),
    allowNull: false,
  })
  start_date: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: DataType.NOW,
  })
  created: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  modified: Date;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  modified_by: number;
}