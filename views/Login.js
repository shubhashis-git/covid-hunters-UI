import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { showMessage } from "react-native-flash-message";
import PushNotification from './PushNotification';
import {SharedServices} from '../services/SharedServices';

const image = require("../assets/login_bkg.png");

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginInput: '',
      loginProcess: false
    };

    this.sharedService = SharedServices();
  }

  loginHandler = () => {
    const { loginInput } = this.state;
    if (loginInput && !isNaN(loginInput)) {
      this.setState({ loginProcess: true });
      const request = new XMLHttpRequest();
      request.open("POST", "https://rest-grateful-meerkat-km.eu-gb.mybluemix.net/login");
      request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      request.send(JSON.stringify({ mobile: loginInput }));
      request.onreadystatechange = () => {
        
        if (request.readyState !== 4) {
          return;
        }
        
        if (request.status === 200) {
          console.log('Login success');
          const successdata = JSON.parse(request.responseText);
          this.sharedService.setItem('loggedInUser', successdata);
          this.setState({ loginProcess: false });
          if (successdata.type == 'admin') {
            this.props.navigation.navigate('Admin', {data: successdata});
          } else {
            this.props.navigation.navigate('Profile');
          }
        } else {
          this.setState({ loginProcess: false });
          showMessage({message: "Login Failed", description: 'Failed login. PLease try again', type: "danger", icon: "danger"});
        }
      };
    }
  }

  textChangeHandler = (loginInput) => {
    this.setState({ loginInput });
  }

  render() {
    const { loginInput, loginProcess } = this.state;

    return (
      <View style={styles.container}>
        <Image source={image} style={styles.image} imageStyle={{ resizeMode: "stretch" }}>
        </Image>

        <Text style={styles.appHeadeTitle}>BeSafe</Text>

        <View style={styles.inputContainer}>
          <Input containerStyle={styles.inputBox}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            placeholder='Mobile number'
            leftIcon={{ type: 'font-awesome', name: 'user' }}
            onChangeText={this.textChangeHandler.bind(this)}
            value={loginInput}
            maxLength={10}
          />

          <View style={{ flexDirection: 'column', justifyContent: 'space-between', width: '65%' }}>
            <Button
              title="Login"
              style={styles.loginBtn}
              buttonStyle={styles.buttonStyle}
              onPress={this.loginHandler.bind(this)}
              loading={loginProcess}
              disabled={loginProcess}
            />
            <Button
              title="New user"
              buttonStyle={{ marginTop: 30 }}
              type="clear"
              onPress={() => this.props.navigation.navigate('Registration')}
            />
          </View>
        </View>
        {/* <PushNotification /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#000000'
  },
  image: {
    height: '50%',
    width: '100%'
  },
  appHeadeTitle: {
    fontSize: 40,
    color: '#19aaff',
    position: 'absolute',
    left: '35%',
    top: 30
  },
  inputContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  inputBox: {
    borderColor: '#19aaff',
    borderWidth: 3,
    borderRadius: 23,
    width: '65%',
    backgroundColor: '#fff',
    marginTop: 60
  },
  inputContainerStyle: {
    borderBottomWidth: 0
  },
  inputStyle: {
    paddingLeft: 15
  },
  buttonStyle: {
    borderRadius: 20,
    marginTop: 40
  },
  buttonTouchable: {
    padding: 16
  }
});

export default Login;
