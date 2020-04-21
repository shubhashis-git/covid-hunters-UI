const data = [];
export const SharedServices = () => {
  return {
    setItem: (key, value) => {
      data[key] = value;
    },
  
    getItem: (key) => {
      return data[key];
    },
  
    removeItem: (key) => {
      if (data[key]) {
        delete data[key];
      }
    }
  };
};
