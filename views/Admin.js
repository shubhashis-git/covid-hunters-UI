import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

const image = require("../assets/background.png");

class Admin extends Component {
  constructor(props) {
    super(props);
    this.searchPerson = this.searchPerson.bind(this);
  }

  openScanner() {
    console.log('Scan');
  }

  searchPerson() {
    console.log('searchPerson');
    this.props.navigation.navigate('AdminPersonDetails');
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          <View style={styles.containerWrapper}>
            <View style={styles.inputContainer}>
              <Input style={styles.input}
                placeholder='Enter mobile number'
              />

              <Icon style={styles.searchIcon} onPress={this.searchPerson}
                name="angle-right"
                size={25}
                color="white"
              />
            </View>

            <Text style={styles.divider}> ────────  Or  ────────</Text>

            <Button style={styles.scanBtn} title="Scan QR" onPress={this.openScanner} color="#201484" />
          </View>
        </ImageBackground>
      </View>
    );
  }
}
{ }
const styles = StyleSheet.create({
  containerWrapper: {
    paddingVertical: 50,
    paddingHorizontal: 30
  },
  container: {
    flex: 1,
    flexDirection: "column"
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  searchIcon: {
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#201484'
  },
  scanBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 30
  },
  divider: {
    margin: 80,
    marginBottom: 100,
    color: 'blue',
    textAlign: 'center'
  }
});

export default Admin;
