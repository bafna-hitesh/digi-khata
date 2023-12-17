import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../loaders/sequelize';

interface IOrder {
  id: string;
  userId: string;
  brokerName: string;
  orderDate: Date;
  exchange: string;
  product: string;
  price: number;
  quantity: number;
  status: string;
  guid: string | null;
  tag: string | null;
  intrument_token: string;
  placed_by: string;
  tradingsymbol: string;
  order_type: string;
  validity: string;
  trigger_price: number;
  disclosed_quantity: number;
  transaction_type: string;
  average_price: number;
  filled_quantity: number;
  pending_quantity: number;
  status_message: string | null;
  status_message_raw: string | null;
  exchange_order_id: string;
  parent_order_id: string | null;
  order_id: string;
  variety: string;
  order_timestamp: Date;
  exchange_timestamp: Date;
  is_amo?: boolean; // Only found in Upstox
  order_request_id?: string; // Only found in Upstox
  order_ref_id?: string; // Only found in Upstox
  exchange_update_timestamp?: string; // Only found in Kite
  modified?: boolean; // Only found in Kite
  cancelled_quantity?: number; // Only found in Kite
  // Todo - Find if the below variable is correct in Kite since in response type it is shown as auction_number
  market_protection?: string; // Only found in Kite
}
class Order extends Model<IOrder, Partial<IOrder>> {}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    brokerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    exchange: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    guid: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    intrument_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    placed_by: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tradingsymbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    validity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    trigger_price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    disclosed_quantity: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    transaction_type: {
      type: DataTypes.ENUM('BUY', 'SELL'),
      allowNull: false,
    },
    average_price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    filled_quantity: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    pending_quantity: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    status_message: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status_message_raw: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    exchange_order_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    parent_order_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    order_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    variety: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order_timestamp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    exchange_timestamp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_amo: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    order_request_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    order_ref_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    exchange_update_timestamp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    modified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    cancelled_quantity: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    market_protection: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: true,
  },
);

export { IOrder };
export default Order;
