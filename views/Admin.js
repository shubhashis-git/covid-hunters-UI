import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import Logout from './Logout';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { showMessage } from "react-native-flash-message";
import { SharedServices } from '../services/SharedServices';

const image = require("../assets/background.png");

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPermission: null,
      scanned: true,
      loginInput: '',
      registerProcess: false
    };
    this.searchPerson = this.searchPerson.bind(this, '');
    this.sharedService = SharedServices();
  }

  async UNSAFE_componentWillMount() {
    try {
      let loggedInUser = this.sharedService.getItem('loggedInUser');
      if (loggedInUser) {
        this.props.navigation.setOptions({
          headerLeft: null,
          title: `${loggedInUser.firstName} ${loggedInUser.lastName}`,
          headerRight: () => <Logout navigation={this.props.navigation} top='10' />
        });
      }

      const { status } = await BarCodeScanner.requestPermissionsAsync();
      if (status === null) {
        showMessage({ message: "Camera access failed", description: 'Requesting for camera permission', type: "danger", icon: "danger" });
      }
      if (status === false) {
        showMessage({ message: "Camera access failed", description: 'No access to camera', type: "danger", icon: "danger" });
      }
      this.setState({ hasPermission: (status === 'granted') });

    } catch (error) {
      console.log(error);
    }
  }

  textChangeHandler = (loginInput) => {
    this.setState({ loginInput });
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.searchPerson(data);
  };

  searchPerson = async (mobileNumber) => {
    this.setState({ registerProcess: true });

    return;

    mobileNumber = mobileNumber || this.state.loginInput;

    const request = new XMLHttpRequest();
    request.open("POST", "https://rest-grateful-meerkat-km.eu-gb.mybluemix.net/login");
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify({ mobile: mobileNumber }));
    request.onreadystatechange = e => {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 200) {
        this.setState({ registerProcess: false });
        const successdata = JSON.parse(request.responseText);
        this.props.navigation.navigate('AdminPersonDetails', { data: successdata });
      } else {
        this.setState({ registerProcess: false });
        showMessage({ message: "Search Failed", description: 'Search failed. PLease try again', type: "danger", icon: "danger" });
      }
    }
  }

  render() {
    const { scanned, registerProcess } = this.state;

    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>

          <View style={styles.containerWrapper}>
            <View style={styles.inputContainer}>
              <Input style={styles.input} placeholder='Enter mobile number' placeholderTextColor="#000"
                onChangeText={this.textChangeHandler.bind(this)} maxLength={10} />

              <Button buttonStyle={styles.searchIcon} onPress={this.searchPerson} loading={registerProcess}
                disabled={registerProcess} 
                icon={{
                  name: "angle-right",
                  size: 25,
                  color: "white",
                  type: 'font-awesome'
                }}
              />
            </View>
            <Text style={styles.divider}> ────────  Or  ────────</Text>
            {!scanned &&
              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned.bind(this)}
                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                style={StyleSheet.absoluteFillObject}
              />
            }
            <Button
              buttonStyle={styles.scanBtn}
              title={scanned ? 'Scan QR' : 'Cancel'}
              color={scanned ? '#201484' : 'red'}
              onPress={() => this.setState({ scanned: !scanned })}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerWrapper: {
    paddingVertical: 50,
    paddingHorizontal: 30
  },
  container: {
    flex: 1,
    flexDirection: "column"
  },
  input: {
    color: '#000'
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  searchIcon: {
    borderWidth: 0,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#201484'
  },
  scanBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 30
  },
  divider: {
    margin: 65,
    marginBottom: 100,
    color: 'blue',
    textAlign: 'center'
  }
});

export default Admin;
