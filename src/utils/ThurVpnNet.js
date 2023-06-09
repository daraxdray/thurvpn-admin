import axios from 'axios';

export const baseUrl =  `http://localhost:2023/api/` ;
// 'https://api.thurvpn.com/api/'; 

export const connect = () =>
  axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-type': 'application/json',
    },
  });

export const handler = (response) => {
  var result = response;
  console.info('API RESULT', result.data);
  console.info('API STATUS', result.status);
  if (result.status >= 200 || result.status < 299) {
    return {
      status: result.data.status,
      message: result.data.message,
      data: result.data.data,
    };
  }

  // const status: number = result.response?.status || 400;
  if (result.status >= 300 && result.status <= 399)
    throw { status: false, msg: 'Your request got redirected', data: {} };
  else if (result.status >= 400 && result.status <= 499) throw { status: false, msg: 'Wrong Input Format', data: {} };
  else if (result.status >= 500)
    throw {
      status: false,
      msg: 'Problem from our end, please try again later',
      data: {},
    };

  return result;
};
export const errorHandler = (result) => {
  const status = result.response?.status ?? 500;

  console.log('API_ERROR', result);
  // const status: number = result.response?.status || 400;
  if (status >= 300 && status <= 399) {
    // console.log({status: status, msg: 'Your request got redirected', data: {}});
    throw result;
  } else if (status >= 400 && status <= 499) {
    throw result.response.data;
  } else if (status >= 500) {
    // console.log({
    //   status: status,
    //   msg: 'Problem from our end, please try again later',
    //   data: {},
    // });
    throw result;
  }

  throw { data: null, message: result.message, status: false };
};
