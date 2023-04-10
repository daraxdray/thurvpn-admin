import { connect, errorHandler, handler } from '../utils/ThurVpnNet';

export const getPlanList = async () => {
  // token = (await getItem('token')) ?? (await getItem('secureToken'));
  try {
    const res = await connect().get('plans/get-all');
    const result = await handler(res);
    if (result != null && result.data != null) {
      return result.data;
    }

    return {};
  } catch (e) {
    return errorHandler(e);
  }
}


export const deletePlan = async(id)=>{
  try{
    
    const res = await connect().delete(`plans/delete/${id}`);
    return handler(res);

  }catch(e){
    return errorHandler(e)
  }
}



export const getPlanById = async () => {
  // token = (await getItem('token')) ?? (await getItem('secureToken'));
  try {
    const res = await connect().get('plans/get-all');
    const result = await handler(res);
    if (result != null && result.data != null) {
      return result.data;
    }

    return {};
  } catch (e) {
    return errorHandler(e);
  }
}


export const createPlan = async(data)=>{
  try{
    const res = await connect().post('plans/create',{
      ...data
    });
    return handler(res);

  }catch(e){
    return errorHandler(e)
  }
}
export const updatePlan = async(data)=>{
  try{
    console.log(data);
    const res = await connect().put('plans/update',{
      ...data
    });
    return handler(res);

  }catch(e){
    return errorHandler(e)
  }
}