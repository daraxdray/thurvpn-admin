import { connect, errorHandler, handler } from '../utils/ThurVpnNet';

export const getDashboardData = async () => {
  // token = (await getItem('token')) ?? (await getItem('secureToken'));
  try {
    const res = await connect('').get("settings/get-dashboard-data");
    const result = await handler(res);
    if (result != null && result.data != null) {
      return result.data;
    }

    return {};
  } catch (e) {
    return errorHandler(e);
  }
};
