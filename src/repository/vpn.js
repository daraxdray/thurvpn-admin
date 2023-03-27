import { connect, errorHandler, handler } from '../utils/ThurVpnNet';

export const getVpnData = async () => {
  // token = (await getItem('token')) ?? (await getItem('secureToken'));
  try {
    const res = await connect('').get('vpn/get-vpn');
    const result = await handler(res);
    if (result != null && result.data != null) {
      return result.data;
    }

    return {};
  } catch (e) {
    return errorHandler(e);
  }
}; 

export const getVpnList = async () => {
  // token = (await getItem('token')) ?? (await getItem('secureToken'));
  try {
    const res = await connect('').get('vpn/get-countries');
    const result = await handler(res);
    if (result != null && result.data != null) {
      return result.data;
    }

    return {};
  } catch (e) {
    return errorHandler(e);
  }
};
