import axios from 'axios';

export const UserLogin = async (loginInput) => {
  try {
    const response = await axios.post('https://rest-grateful-meerkat-km.eu-gb.mybluemix.net/login​');
    console.log(response);
    if (response.status >= 200 && response.status <= 299) {
      let jsondata = response.data

      // Sample role based login data start //
      /*const loginsampledata = [{
        id: 2,
        email: 'biswajit.manna@cognizant.com',
        first_name: 'Biswajit',
        last_name: 'Manna',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg',
        role: 'user',
        mobile: '9836252196',
        status: 'Good'
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
      });*/
      // Sample role based login data End //

      return {status: 200, data: jsondata};
    } else {
      return {status: 500, data: 'Unable to get response from server'};
    }
  } catch (error) {
    return {status: 500, data: 'Unable to get response from server'};
  }
};

export const UserRegister = (registerInput) => {
  try {
    const request = new XMLHttpRequest();
    request.open("POST", "https://rest-grateful-meerkat-km.eu-gb.mybluemix.net/register-user");
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify(registerInput));
    request.onreadystatechange = e => {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 200) {
        console.log('success', request.responseText);
        return {status: 200, data: request.responseText};
      } else {
        console.warn('error', request);
        return {status: 500, data: 'Unable to get response from server'};
      }
    };
  } catch (error) {
    return {status: 500, data: 'Unable to get response from server'};
  }
  
};
