import { connect, errorHandler, handler } from '../utils/ThurVpnNet';

export const getUserData = async () => {
  // token = (await getItem('token')) ?? (await getItem('secureToken'));
  
  try {
    const res = await connect('').get('users/get-user');
    const result = await handler(res);
    if (result != null && result.data != null) {
      return result.data;
    }

    return {};
  } catch (e) {
    return errorHandler(e);
  }
};

export const getUsers = async () => {
  // token = (await getItem('token')) ?? (await getItem('secureToken'));
  try {
    const res = await connect('').get('admin/get-users');
    const result = await handler(res);
    if (result != null && result.data != null) {
      return result.data;
    }

    return {};
  } catch (e) {
    return errorHandler(e);
  }
};

