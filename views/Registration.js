import React, {Component} from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

class Registration extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Registration Page</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 30
  }
});

export default Registration;
