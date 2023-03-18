import ApiRoutes from '../utils/ApiRoutes';
import { baseUrl, connect, errorHandler, handler } from '../utils/ThurVpnNet';

export const sendOTP = async (username) => {
  const res = await connect('').post(ApiRoutes.login, { username, password });
};

export const getUserData = async (token) => {
  // token = (await getItem('token')) ?? (await getItem('secureToken'));
  try {
    if (token != null || token != '') {
      const res = await connect(token).get('users/get-user');
      const result = await handler(res);
      if (result != null && result.data != null) {
        return result.data;
      }
      await remove('token');
      await remove('secureToken');
    }
    return {};
  } catch (e) {
    return errorHandler(e);
  }
};
