import React, {Component} from 'react';
import { View, Text, TextInput, StyleSheet, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import {UserLogin} from  '../services/ApiService';
import { showMessage } from "react-native-flash-message";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginInput: '',
      loginProcess: false
    };
  }

  loginHandler = async () => {
    const {loginInput} = this.state;
    if (loginInput && !isNaN(loginInput)) {
      this.setState({loginProcess: true});
      UserLogin().then(resp => {
        this.setState({loginProcess: false});
        if (resp.status === 200) {
          AsyncStorage.setItem('loggedInUser', JSON.stringify({
            mobile: loginInput,
            fname: resp.data.data.first_name,
            lname: resp.data.data.last_name,
            avatar: resp.data.data.avatar
          }));
          this.props.navigation.navigate('Profile');
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
    const { loginInput, loginProcess } = this.state;
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
});

export default Login;
