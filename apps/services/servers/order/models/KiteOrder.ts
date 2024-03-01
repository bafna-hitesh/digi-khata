import { DataTypes, Model, Op } from 'sequelize';
import { sequelize } from '../loaders/sequelize';
import { Mistake } from './Mistake';
import { Strategy } from './Strategy';

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
  instrument_token: number;
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
  order_timestamp: string;
  exchange_timestamp: string | null;
  exchange_update_timestamp: string | null;
  status_message: string | null;
  status_message_raw: string | null;
  cancelled_quantity: number;
  // Todo - Find if the below variable is correct in Kite since in response type it is shown as auction_number
  market_protection: number;
  meta: Record<string, unknown>;
  tag: string | null;
  guid: string | null;
  Mistakes?: Mistake;
  Strategies?: Strategy;
}

class KiteOrder extends Model<IKiteOrder, Partial<IKiteOrder>> {
  static async findOrCreateOrder(kiteOrderDetails: IKiteOrder, userId: string) {
    const [kiteOrder, created] = await KiteOrder.findOrCreate({
      where: { order_id: kiteOrderDetails.order_id },
      defaults: kiteOrderDetails,
    });

    if (created) {
      console.log(`Created new Kite Order for user: ${userId} with Order ID: ${kiteOrder.get('order_id')}`);
    } else {
      console.log(`Already found Kite Order for user: ${userId} with Order ID: ${kiteOrder.get('order_id')}`);
    }

    return kiteOrder;
  }

  static async createBulkOrders(kiteOrdersDetails: IKiteOrder[], userId: string) {
    console.log('Creating bulk Kite orders for user: ', userId);
    // Can lead to inconsistencies if some insert fails due to any reason
    const [kiteOrders] = await KiteOrder.bulkCreate(kiteOrdersDetails, { ignoreDuplicates: true });
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

  static async findOrder(orderId: string, userId: string) {
    console.log(`Finding Kite order ${orderId} on user ${userId}`);
    const kiteOrder = await KiteOrder.findOne({
      where: {
        order_id: orderId,
        userId,
      },
    });
    return kiteOrder;
  }

  static async getAllDataForOrder(orderId: string, userId: string) {
    console.log(`Getting all Kite order ${orderId} data on user ${userId}`);
    const kiteOrderData = await KiteOrder.findOne({
      where: {
        order_id: orderId,
        userId,
      },
      include: [{ all: true }], // Include Model Associations
    });
    return kiteOrderData;
  }

  static async getAllOrdersForUser(userId: string) {
    console.log(`Getting all Kite orders for user: ${userId}`);
    const kiteOrdersData = await KiteOrder.findAll({
      where: {
        userId,
      },
      include: [{ all: true }], // Include Model Associations
    });
    return kiteOrdersData;
  }

  static async getAllMistakesForOrder(orderId: string, userId: string) {
    console.log(`Getting all Mistakes for Kite Order: ${orderId} on user: ${userId}`);
    const mistakesForKiteOrder = await KiteOrder.findOne({
      where: {
        order_id: orderId,
        userId,
      },
      attributes: [],
      include: {
        model: Mistake,
        attributes: ['tag'],
      },
    });
    return mistakesForKiteOrder;
  }

  static async getAllStrategiesForOrder(orderId: string, userId: string) {
    console.log(`Getting all Strategies for Kite Order: ${orderId} on user: ${userId}`);
    const strategiesForKiteOrder = await KiteOrder.findOne({
      where: {
        order_id: orderId,
        userId,
      },
      attributes: [],
      include: {
        model: Strategy,
        attributes: ['tag'],
      },
    });
    return strategiesForKiteOrder;
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
    instrument_token: {
      type: DataTypes.BIGINT,
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    exchange_timestamp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    exchange_update_timestamp: {
      type: DataTypes.STRING,
      allowNull: true,
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
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    meta: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    guid: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'KiteOrder',
    tableName: 'kite_orders',
    timestamps: true,
  },
);

Mistake.belongsToMany(KiteOrder, { through: 'kite_order_mistake' });
KiteOrder.belongsToMany(Mistake, { through: 'kite_order_mistake' });

Strategy.belongsToMany(KiteOrder, { through: 'kite_order_strategy' });
KiteOrder.belongsToMany(Strategy, { through: 'kite_order_strategy' });

export { KiteOrder, IKiteOrder };
