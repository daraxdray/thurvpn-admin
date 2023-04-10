const useThurDate = () => {
  const getDate = (data) => {
    const date = new Date(data);
    return date.toDateString();
  };


  const getExpirationDate = (createdDate, expireMonth) =>{
    var currentDate = new Date();
    
    var expirationDate = new Date(currentDate);
    expirationDate.setMonth(expirationDate.getMonth() + expireMonth);
    expirationDate.setDate(createdDate.getDate());
    return expirationDate.toDateString();
  }
  

  return [getDate, getExpirationDate]
};

export default useThurDate;
