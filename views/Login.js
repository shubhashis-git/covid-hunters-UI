import React, {Component} from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputBox} 
            placeholder="Please enter your mobile number."
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button title="Login" onPress={() => this.props.navigation.navigate('Admin')} color="red" />
            <Button title="New user" onPress={() => this.props.navigation.navigate('Registration')} color="orange" />
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
