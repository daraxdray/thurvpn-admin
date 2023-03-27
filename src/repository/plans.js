import { connect, errorHandler, handler } from '../utils/ThurVpnNet';

export const getPlanList = async () => {
  // token = (await getItem('token')) ?? (await getItem('secureToken'));
  try {
    const res = await connect('').get('plans/get-all');
    const result = await handler(res);
    if (result != null && result.data != null) {
      return result.data;
    }

    return {};
  } catch (e) {
    return errorHandler(e);
  }
}
