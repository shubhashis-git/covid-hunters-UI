import React, {Component} from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { Button } from 'react-native-elements';
import {UserRegister} from  '../services/ApiService';
import { showMessage } from "react-native-flash-message";

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      registerInput: '',
      registerProcess: false
    };

  }

  textChangeHandler = (registerInput) => {
    this.setState({registerInput});
  }

  registeredHandler = async () => {
    const {registerInput} = this.state;
    if (registerInput && !isNaN(registerInput)) {
      this.setState({registerProcess: true});
      UserRegister().then(resp => {
        this.setState({loginProcess: false});
        if (resp.status === 200) {
          showMessage({message: "Registration Successful", description: resp.data, type: "primary", icon: "primary"});
        } else {
          showMessage({message: "Registration Failed", description: resp.data, type: "danger", icon: "danger"});
        }
      });
    }
  }
  render() {
    const { registerInput, registerProcess } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputBox} 
            placeholder="Please enter your mobile number."
            onChangeText={this.textChangeHandler.bind(this)}
            value={registerInput}
            maxLength={10}
          />
          <TextInput
            style={styles.inputBox} 
            placeholder="Please enter your first name."
            onChangeText={this.textChangeHandler.bind(this)}
            value={registerInput}
          />
          <TextInput
            style={styles.inputBox} 
            placeholder="Please enter your last name."
            onChangeText={this.textChangeHandler.bind(this)}
            value={registerInput}
          />
          <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
            <View style={{width: 150}}>
            <Button 
              title="Register" 
              onPress={this.registerHandler.bind(this)}
              loading={registerProcess}
              disabled={registerProcess}
            />
            </View>
            <Button 
              title="Already registered ? Click Here"
              type="clear" 
              onPress={() => this.props.navigation.navigate('Login')} 
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

export default Registration;
