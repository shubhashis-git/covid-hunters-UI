import axios from 'axios';

export const UserLogin = async (loginInput) => {
  try {
    const response = await axios.get('https://reqres.in/api/users/2');

    if (response.status >= 200 && response.status <= 299) {
      let jsondata = response.data

      // Sample role based login data start //
      const loginsampledata = [{
        id: 2,
        email: 'biswajit.manna@cognizant.com',
        first_name: 'Biswajit',
        last_name: 'Manna',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg',
        role: 'user',
        mobile: '9836252196',
        status: 'normal'
      },
      {
        id: 2,
        email: 'sujata.chanda@cognizant.com',
        first_name: 'Sujata',
        last_name: 'Chanda',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg',
        role: 'admin',
        mobile: '9062103433'
      }];

      jsondata = loginsampledata.filter(dt => {
        return dt.mobile === loginInput;
      });
      // Sample role based login data End //

      return {status: 200, data: jsondata, person: loginsampledata[0]};
    } else {
      return {status: 500, data: 'Unable to get response from server'};
    }
  } catch (error) {
    return {status: 500, data: 'Unable to get response from server'};
  }
};

export const UserRegister = async (registerInput) => {
  try {
    console.log(registerInput);
    const response = await axios.post('https://reqres.in/api/register', registerInput);
    if (response.status >= 200 && response.status <= 299) {
      return {status: 200, data: 'Registration is successfull'};
    } else {
      return {status: 500, data: 'Unable to get response from server'};
    }    
  } catch (error) {
    return {status: 500, data: 'Unable to get response from server'};
  }
};
