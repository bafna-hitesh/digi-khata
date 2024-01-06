import BrokerAccount from '../../user/models/Broker';
import User from '../../user/models/User';

const getAllUsers = async () => {
  const users = await User.getAllUsers();
  return users;
};

const getBrokerTokensForUser = async (userId: string) => {
  const brokerTokens = await BrokerAccount.getActiveBrokerTokens(userId);
  return brokerTokens;
};

export { getAllUsers, getBrokerTokensForUser };
