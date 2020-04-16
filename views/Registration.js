import React, {Component} from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';

class Registration extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputBox} 
            placeholder="Please enter your Name."
          />
          <TextInput
            style={styles.inputBox} 
            placeholder="Please enter your mobile number."
          />
          <TextInput
            style={styles.inputBox} 
            placeholder="Please enter your address."
          />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button title="Register Here" onPress={() => this.props.navigation.navigate('Registration')} color="red" />
            <Button title="Login Here" onPress={() => this.props.navigation.navigate('Login')} color="orange" />
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
