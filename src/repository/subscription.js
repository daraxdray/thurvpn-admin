import { connect, errorHandler, handler } from '../utils/ThurVpnNet';

export const getUserSubscription = async () => {
  try {
    const res = await connect().get('purchases/get-all');
    const result = await handler(res);
    if (result != null && result.data != null) {
      console.log('result.data', result.data);
      return result.data;
    }
    return {};
  } catch (e) {
    return errorHandler(e);
  }
};


export const deleteSub = async(id)=>{
  try{
    
    const res = await connect().delete(`purchases/delete/${id}`);
    return handler(res);

  }catch(e){
    return errorHandler(e)
  }
}