export const UserRegister = async (registerInput) => {
    try {
      const response = await fetch('https://reqres.in/api/users/2');
      if (response.status >= 200 && response.status <= 299) {
        let registerInput = await response.json();

  
        return {status: 200, data: registerInput};
      } else {
        return {status: 500, data: 'Unable to get response from server'};
      }    
    } catch (error) {
      return {status: 500, data: 'Unable to get response from server'};
    }
  };