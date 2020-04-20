import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { UserRegister } from '../services/ApiService';
import { showMessage } from "react-native-flash-message";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import RadioForm from 'react-native-simple-radio-button';
import { Notifications } from 'expo';

const background = require('../assets/register_bkg.jpg');

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      registerInput: {
        firstName: '',
        lastName: '',
        type: 'user',
        mobile: '',
        image: 'NA',
        deviceId: ''
      },
      registerProcess: false
    };

  }

  UNSAFE_componentWillMount = async () => {
    try {
      const token = await Notifications.getExpoPushTokenAsync();
      if (token) {
        const { registerInput } = this.state;
        registerInput.deviceId = token;
        this.setState({ registerInput });
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        console.log('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.1,
        base64: true
      });
      if (!result.cancelled) {
        const { registerInput } = this.state;
        registerInput.image = result.base64;
        this.setState({ registerInput });
      }
    } catch (E) {
      console.log(E);
    }
  };

  textChangeHandler = (field, value) => {
    const { registerInput } = this.state;
    registerInput[field] = value;
    this.setState({ registerInput });
  }

  formValidate = () => {
    const { firstName, lastName, mobile, image } = this.state.registerInput;
    if (firstName && lastName && mobile && image !== 'NA') {
      return true;
    } else {
      return false;
    }
  }

  resetAllFields = () => {
    const registerInput = {
      firstName: '',
      lastName: '',
      type: 'user',
      mobile: '',
      image: 'NA',
      deviceId: ''
    };
    this.setState({ registerInput });
  }

  registerHandler = () => {
    console.log('11');
    if (this.formValidate()) {
      console.log('22');
      const { registerInput } = this.state;
      console.log(registerInput);
      this.setState({ registerProcess: true });
      const request = new XMLHttpRequest();
      request.open("POST", "https://rest-grateful-meerkat-km.eu-gb.mybluemix.net/register-user");
      request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      request.send(JSON.stringify(registerInput));
      request.onreadystatechange = e => {
        this.setState({ registerProcess: false });
        if (request.readyState !== 4) {
          return;
        }

        if (request.status === 200) {
          //console.log('success', request.responseText);
          this.resetAllFields();
          showMessage({ message: "Registration Success", description: 'You are successfully registered', type: "success", icon: "success" });
        } else {
          console.warn('error', request.status, request.responseText);
          //return {status: 500, data: 'Unable to get response from server'};
          showMessage({ message: "Registration Failed", description: 'Unable to get response from server', type: "danger", icon: "danger" });
        }
      };
    } else {
      showMessage({ message: "Validation Failed", description: 'All fields are required.', type: "danger", icon: "danger" });
    }
  }

  render() {
    const { registerInput, registerProcess } = this.state;
    const radio_props = [
      { label: 'User', value: 'user' },
      { label: 'Admin', value: 'admin' }
    ];
    return (
      <View style={styles.formContainer}>
        <ImageBackground source={background} style={styles.image} imageStyle={{ resizeMode: "stretch" }}>
          <View style={styles.formContainerWrapper}>
            <Text style={styles.headerText}>Lets get you on board</Text>
            <View style={styles.inputContainer}>
              <Input
                placeholder='First Name'
                style={styles.inputTextBox}
                value={registerInput.firstName}
                placeholderTextColor="#000000b8"
                onChangeText={this.textChangeHandler.bind(this, 'firstName')}
              />
            </View>
            <View style={styles.inputContainer}>
              <Input
                placeholder='Last Name'
                placeholderTextColor="#000000b8"
                style={styles.inputTextBox}
                value={registerInput.lastName}
                onChangeText={this.textChangeHandler.bind(this, 'lastName')}
              />
            </View>
            <View style={styles.inputContainer}>
              <Input
                style={[styles.inputTextBox]}
                placeholderTextColor="#000000b8"
                placeholder="Mobile"
                maxLength={10}
                value={registerInput.mobile}
                onChangeText={this.textChangeHandler.bind(this, 'mobile')}
              />
            </View>
            <View style={{ margin: 10 }}>
              <RadioForm
                radio_props={radio_props}
                initial={0}
                formHorizontal={true}
                labelHorizontal={true}
                animation={true}
                labelStyle={{ marginRight: 20 }}
                onPress={this.textChangeHandler.bind(this, 'type')}
              />
            </View>
            {/* style={{ width: 200, height: 200 }} */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Upload Photo</Text>
              {registerInput.image !== 'NA' && 
              <Image source={{ uri: `data:image/png;base64,${registerInput.image}` }} style={{ width: 200, height: 200 }} />}
              <Button title="Open camera" onPress={this._pickImage} />
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Button
                title="Submit"
                onPress={this.registerHandler.bind(this)}
                loading={registerProcess}
                disabled={registerProcess}
              />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    flexDirection: 'column',
    height: '100%',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  formContainerWrapper: {
    width: '85%',
    padding: 15,
    backgroundColor: '#ffffffe6'
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignItems: "center"
  },
  inputContainer: {
    flexDirection: 'column',
    marginBottom: 10
  },
  inputTextBox: {
    borderColor: '#d3d3d3',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 12,
    marginTop: 5,
    padding: 8,
  },
  inputLabel: {
    fontSize: 15,
    color: '#000000d1',
    marginBottom: 5
  },
  inputTextareaBox: {
    height: 100,
    textAlignVertical: 'top'
  }
});

export default Registration;
