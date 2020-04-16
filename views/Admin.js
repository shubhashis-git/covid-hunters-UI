import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Divider } from 'react-native-elements';


class Admin extends Component {
  constructor(props) {
    super(props);
  }

  openScanner() {
    console.log('Scan');
  }

  searchPerson() {
    console.log('searchPerson');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Input style={styles.input}
            placeholder='Enter mobile number'
          />

          <Icon style={styles.searchIcon} onPress={this.searchPerson}
            name="angle-right"
            size={25}
            color="black"
          />
        </View>

        <Divider style={styles.divider} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button title="Scan QR" onPress={this.openScanner} color="red" />
        </View>
      </View>
    );
  }
}
{ }
const styles = StyleSheet.create({
  container: {
    marginVertical: 50,
    marginHorizontal: 30
  },
  searchIcon: {
    
  },
  inputContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between' 
  },
  divider: {
    margin: 60,
    backgroundColor: 'blue' 
  }
});

export default Admin;
