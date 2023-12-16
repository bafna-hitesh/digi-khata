import { DataTypes, Model, Op } from 'sequelize';
import { sequelize } from '../loaders/sequelize';
import Mistake from './Mistake';
import Strategy from './Strategy';

interface IKiteOrder {
  id: string;
  userId: string;
  brokerName: string;
  orderDate: Date;
  order_id: string;
  parent_order_id: string | null;
  exchange_order_id: string | null;
  modified: boolean;
  placed_by: string;
  variety: string;
  status: string;
  tradingsymbol: string;
  exchange: string;
  intrument_token: string;
  transaction_type: string;
  order_type: string;
  product: string;
  validity: string;
  price: number;
  quantity: number;
  trigger_price: number;
  average_price: number;
  pending_quantity: number;
  filled_quantity: number;
  disclosed_quantity: number;
  order_timestamp: Date;
  exchange_timestamp: Date;
  exchange_update_timestamp: Date;
  status_message: string | null;
  status_message_raw: string | null;
  cancelled_quantity: number;
  // Todo - Find if the below variable is correct in Kite since in response type it is shown as auction_number
  market_protection: string;
  meta: Record<string, unknown>;
  tag: string | null;
  guid: string | null;
}

class KiteOrder extends Model<IKiteOrder, Partial<IKiteOrder>> {
  static async findOrCreateOrder(kiteOrderDetails: IKiteOrder) {
    const [kiteOrder, created] = await KiteOrder.findOrCreate({
      where: { order_id: kiteOrderDetails.order_id },
      defaults: kiteOrderDetails,
    });

    if (created) {
      console.log('Created new Kite Order with ID: ', kiteOrder.get('order_id'));
    } else {
      console.log('Already found Kite Order with ID: ', kiteOrder.get('order_id'));
    }

    return kiteOrder;
  }

  static async createBulkOrders(kiteOrdersDetails: IKiteOrder[], userId: string) {
    console.log('Creating bulk Kite orders for user: ', userId);
    // Can lead to inconsistencies if some insert fails due to any reason
    const [kiteOrders] = await KiteOrder.bulkCreate(kiteOrdersDetails);
    return kiteOrders;
  }

  static async findAllOrders(userId: string, startDate: Date, endDate: Date) {
    console.log(`Finding all Kite orders with userId: ${userId}, startDate: ${startDate}, endDate: ${endDate}`);
    const kiteOrders = await KiteOrder.findAll({
      where: {
        userId,
        orderDate: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
    return kiteOrders;
  }
}

KiteOrder.init(
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
      defaultValue: 'KITE',
      allowNull: false,
    },
    orderDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    parent_order_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    exchange_order_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    modified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    placed_by: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    variety: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tradingsymbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    exchange: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    intrument_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transaction_type: {
      type: DataTypes.ENUM('BUY', 'SELL'),
      allowNull: false,
    },
    order_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    validity: {
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
    trigger_price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    average_price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    pending_quantity: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    filled_quantity: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    disclosed_quantity: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    order_timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    exchange_timestamp: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    exchange_update_timestamp: {
      type: DataTypes.DATE,
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
    cancelled_quantity: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    market_protection: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    meta: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    guid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'KiteOrder',
    tableName: 'kite_orders',
    timestamps: true,
  },
);

Mistake.belongsToMany(KiteOrder, { through: 'upstox_order_mistake' });
KiteOrder.belongsToMany(Mistake, { through: 'upstox_order_mistake' });

Strategy.belongsToMany(KiteOrder, { through: 'upstox_order_strategy' });
KiteOrder.belongsToMany(Strategy, { through: 'upstox_order_strategy' });

export { KiteOrder, IKiteOrder };
