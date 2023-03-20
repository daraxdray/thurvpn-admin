import ApiRoutes from '../utils/ApiRoutes';
import { connect, errorHandler, handler } from '../utils/thurVpnNet';

// export const sendOTP = async (username) => {
//   const res = await connect('').post(ApiRoutes.login, { username, password });
// };
export const adminLogin = async (email, password) => {
  try {
    const res = await connect().post(ApiRoutes.login, { email, password });

    return handler(res);
  } catch (error) {
    errorHandler(error);
  }
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
    }
    return {};
  } catch (e) {
    return errorHandler(e);
  }
};
