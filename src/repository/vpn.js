import { connect, errorHandler, handler } from '../utils/ThurVpnNet';

export const getVpnData = async () => {
  // token = (await getItem('token')) ?? (await getItem('secureToken'));
  try {
    const res = await connect().get('vpn/get-vpn');
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
    const res = await connect().get('vpn/get-countries');
    const result = await handler(res);
    if (result != null && result.data != null) {
      return result.data;
    }

    return {};
  } catch (e) {
    return errorHandler(e);
  }
};
export const getVpnById = async (id) => {
  // token = (await getItem('token')) ?? (await getItem('secureToken'));
  try {
    const res = await connect().get(`vpn/get/${id}`);
    const result = await handler(res);
    if (result != null && result.data != null) {
      return result.data;
    }

    return {};
  } catch (e) {
    return errorHandler(e);
  }
};


export const createVPN = async(data)=>{
  try{
    const res = await connect().post('vpn/create',{
      ...data
    });
    return handler(res);

  }catch(e){
    return errorHandler(e)
  }
}
export const deleteVPN = async(id)=>{
  try{
    
    const res = await connect().delete(`vpn/delete/${id}`);
    return handler(res);

  }catch(e){
    return errorHandler(e)
  }
}