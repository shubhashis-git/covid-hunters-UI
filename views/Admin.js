import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, Button, Modal, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import Logout from './Logout';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { showMessage } from "react-native-flash-message";
import ShowScannResult from './ShowScannResult';
import { Ionicons } from '@expo/vector-icons';

const image = require("../assets/background.png");

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPermission: null,
      scanned: true,
      scannedData: null,
      visibleModal: false
    };
    this.searchPerson = this.searchPerson.bind(this);
  }

  async UNSAFE_componentWillMount() {
    try {
      let loggedInUser = await AsyncStorage.getItem('loggedInUser');
      if (loggedInUser) {
        loggedInUser = JSON.parse(loggedInUser);
        this.props.navigation.setOptions({
          headerLeft: null,
          title: `${loggedInUser.first_name} ${loggedInUser.last_name}`,
          headerRight: () => <Logout navigation={this.props.navigation} />
        });
      }

      const { status } = await BarCodeScanner.requestPermissionsAsync();
      if (status === null) {
        showMessage({message: "Camera access failed", description: 'Requesting for camera permission', type: "danger", icon: "danger"});
      }
      if (status === false) {
        showMessage({message: "Camera access failed", description: 'No access to camera', type: "danger", icon: "danger"});
      }
      this.setState({hasPermission: (status === 'granted')});

    } catch (error) {
      console.log(error);
    }
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({scanned: true, scannedData: data, visibleModal: true});
  };

  searchPerson() {
    this.props.navigation.navigate('AdminPersonDetails');
  }

  render() {
    const {scanned, scannedData} = this.state;
    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          <View style={styles.containerWrapper}>
            <View style={styles.inputContainer}>
              <Input style={styles.input} placeholder='Enter mobile number' />
              <Icon style={styles.searchIcon} onPress={this.searchPerson}
                name="angle-right"
                size={25}
                color="white"
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
              style={styles.scanBtn} 
              title={scanned ? 'Scan QR' : 'Cancel'}
              color={scanned ? '#201484' : 'red'}
              onPress={() => this.setState({scanned: !scanned})} 
            />
            <Modal
              visible={this.state.visibleModal}
              animationType="slide"
              transparent={true}>
                <View style={styles.modalView}>
                  <Ionicons name="ios-close-circle" size={30} style={{margin: 15}} onPress={() => this.setState({visibleModal: false})}/>
                  <ShowScannResult scannedData={scannedData} />
                </View>
            </Modal>    
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
    margin: 65,
    marginBottom: 100,
    color: 'blue',
    textAlign: 'center'
  },
  modalView: {
    backgroundColor: '#f0f8ff',
    margin: 15,
    width: 365,
    height: 740,
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  }
});

export default Admin;
