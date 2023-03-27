import { connect, errorHandler, handler } from '../utils/ThurVpnNet';
import ApiRoutes from '../utils/ApiRoutes';

export const adminLogin = async (email, password) => {
  try {

    const res = await connect('').post(ApiRoutes.login, { email, password });
    const result = handler(res);
    console.log("USER LOGGING",result.data);
    localStorage.setItem("uid", result.data.user._id);
    localStorage.setItem("utoken", result.data.jwt);
    return result;
  } catch (error) {
    errorHandler(error);
  }
};

export const getUserData = async () => {
  // token = (await getItem('token')) ?? (await getItem('secureToken'));
  try {
    const id = localStorage.getItem("uid");
    if (id == undefined || !id || id == '' || id == 'undefined') { throw false }
    const res = await connect('').get(`users/${id}`);
    const result = await handler(res);
    localStorage.setItem("uid", result.data._id);
    if (result != null && result.data != null) {
      return result.data;
    }
    return {};
  } catch (e) {
    return errorHandler(e);
  }
};
