import { DataTypes, Model, Op } from 'sequelize';
import { sequelize } from '../loaders/sequelize';
import { Mistake } from './Mistake';
import { Strategy } from './Strategy';

interface IUpstoxOrder {
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
  instrument_token: string;
  placed_by: string;
  trading_symbol: string;
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
  order_timestamp: string;
  exchange_timestamp: string | null;
  is_amo: boolean;
  order_request_id: string;
  order_ref_id: string;
}
class UpstoxOrder extends Model<IUpstoxOrder, Partial<IUpstoxOrder>> {
  static async findOrCreateOrder(upstoxOrderDetails: IUpstoxOrder, userId: string) {
    const [upstoxOrder, created] = await UpstoxOrder.findOrCreate({
      where: { order_id: upstoxOrderDetails.order_id },
      defaults: upstoxOrderDetails,
    });

    if (created) {
      console.log(`Created new Upstox Order for user: ${userId} with Order ID: ${upstoxOrder.get('order_id')}`);
    } else {
      console.log(`Already found Upstox Order for user: ${userId} with Order ID: ${upstoxOrder.get('order_id')}`);
    }

    return upstoxOrder;
  }

  static async createBulkOrders(upstoxOrdersDetails: IUpstoxOrder[], userId: string) {
    console.log('Creating bulk Upstox orders for user: ', userId);
    // Can lead to inconsistencies if some insert fails due to any reason
    const [upstoxOrders] = await UpstoxOrder.bulkCreate(upstoxOrdersDetails, { ignoreDuplicates: true });
    return upstoxOrders;
  }

  static async findAllOrders(userId: string, startDate: Date, endDate: Date) {
    console.log(`Finding all Upstox orders with userId: ${userId}, startDate: ${startDate}, endDate: ${endDate}`);
    const upstoxOrders = await UpstoxOrder.findAll({
      where: {
        userId,
        orderDate: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
    return upstoxOrders;
  }

  static async findOrder(orderId: string, userId: string) {
    console.log(`Finding Upstox order ${orderId} on user ${userId}`);
    const upstoxOrder = await UpstoxOrder.findOne({
      where: {
        order_id: orderId,
        userId,
      },
    });
    return upstoxOrder;
  }

  static async getAllDataForOrder(orderId: string, userId: string) {
    console.log(`Getting all Upstox order ${orderId} data on user ${userId}`);
    const upstoxOrderData = await UpstoxOrder.findOne({
      where: {
        order_id: orderId,
        userId,
      },
      include: [{ all: true }], // Include Model Associations
    });
    return upstoxOrderData;
  }

  static async getAllOrdersForUser(userId: string) {
    console.log(`Getting all Upstox orders for user: ${userId}`);
    const upstoxOrdersData = await UpstoxOrder.findAll({
      where: {
        userId,
      },
      include: [{ all: true }], // Include Model Associations
    });
    return upstoxOrdersData;
  }

  static async getAllMistakesForOrder(orderId: string, userId: string) {
    console.log(`Getting all Mistakes for Upstox Order: ${orderId} on user: ${userId}`);
    const mistakesForUpstoxOrder = await UpstoxOrder.findOne({
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
    return mistakesForUpstoxOrder;
  }

  static async getAllStrategiesForOrder(orderId: string, userId: string) {
    console.log(`Getting all Strategies for Upstox Order: ${orderId} on user: ${userId}`);
    const strategiesForUpstoxOrder = await UpstoxOrder.findOne({
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
    return strategiesForUpstoxOrder;
  }
}

UpstoxOrder.init(
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
      defaultValue: 'UPSTOX',
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
    instrument_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    placed_by: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    trading_symbol: {
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
      unique: true,
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
      allowNull: false,
    },
    order_request_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order_ref_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'UpstoxOrder',
    tableName: 'upstox_orders',
    timestamps: true,
  },
);

Mistake.belongsToMany(UpstoxOrder, { through: 'upstox_order_mistake' });
UpstoxOrder.belongsToMany(Mistake, { through: 'upstox_order_mistake' });

Strategy.belongsToMany(UpstoxOrder, { through: 'upstox_order_strategy' });
UpstoxOrder.belongsToMany(Strategy, { through: 'upstox_order_strategy' });

export { UpstoxOrder, IUpstoxOrder };
