import React, {Component} from 'react';
import { View, Text, TextInput, StyleSheet, AsyncStorage, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import {UserLogin} from  '../services/ApiService';
import { showMessage } from "react-native-flash-message";
import PushNotification from './PushNotification';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginInput: '9836252196',
      loginProcess: false
    };
  }

  loginHandler = async () => {
    const {loginInput} = this.state;
    if (loginInput && !isNaN(loginInput)) {
      this.setState({loginProcess: true});
      UserLogin(loginInput).then(resp => {
        this.setState({loginProcess: false});
        if (resp.status === 200) {
          if (resp.data.length) {
            AsyncStorage.setItem('loggedInUser', JSON.stringify(resp.data[0]));
            if (resp.data[0].role === 'admin') {
              this.props.navigation.navigate('Admin');
            } else {
              this.props.navigation.navigate('Profile');
            }
          } else {
            showMessage({message: "Login Failed", description: 'Invalid login data', type: "danger", icon: "danger"});
          }
        } else {
          showMessage({message: "Login Failed", description: resp.data, type: "danger", icon: "danger"});
        }
      });
    }
  }

  textChangeHandler = (loginInput) => {
    this.setState({loginInput});
  }

  render() {
    const { loginInput, loginProcess, scanned } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputBox} 
            placeholder="Please enter your mobile number."
            onChangeText={this.textChangeHandler.bind(this)}
            value={loginInput}
            maxLength={10}
          />
          <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
            <View style={{width: 150}}>
            <Button 
              title="Login" 
              onPress={this.loginHandler.bind(this)}
              loading={loginProcess}
              disabled={loginProcess}
            />
            </View>
            <Button 
              title="New user ? Click Here"
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
    margin: 30
  },
  inputContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  inputBox: {   
    borderColor: '#CCC',
    borderWidth: 2,
    margin: 10,
    padding: 10
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});

export default Login;
