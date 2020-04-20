import React, {Component} from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { showMessage } from "react-native-flash-message";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import RadioForm from 'react-native-simple-radio-button';
import { Notifications } from 'expo';

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
        const {registerInput} = this.state;
        registerInput.deviceId = token;
        this.setState({registerInput});
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
        const {registerInput} = this.state;
        registerInput.image = result.base64;
        this.setState({registerInput});
      }
    } catch (E) {
      console.log(E);
    }
  };

  textChangeHandler = (field, value) => {
    const {registerInput} = this.state;
    registerInput[field] = value;
    this.setState({registerInput});
  }

  formValidate = () => {
    const {firstName, lastName, mobile, image} = this.state.registerInput;
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
    this.setState({registerInput});
  }

  registerHandler = () => {
    console.log('11');
    if (this.formValidate()) {
      console.log('22');
      const {registerInput} = this.state;
      console.log(registerInput);
      this.setState({registerProcess: true});
      const request = new XMLHttpRequest();
      request.open("POST", "https://rest-grateful-meerkat-km.eu-gb.mybluemix.net/register-user");
      request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      request.send(JSON.stringify(registerInput));
      request.onreadystatechange = e => {
        this.setState({registerProcess: false});
        if (request.readyState !== 4) {
          return;
        }

        if (request.status === 200) {
          //console.log('success', request.responseText);
          this.resetAllFields();
          showMessage({message: "Registration Success", description: 'You are successfully registered', type: "success", icon: "success"});
        } else {
          console.warn('error', request.status, request.responseText);
          //return {status: 500, data: 'Unable to get response from server'};
          showMessage({message: "Registration Failed", description: 'Unable to get response from server', type: "danger", icon: "danger"});
        }
      };
    } else {
      showMessage({message: "Validation Failed", description: 'All fields are required.', type: "danger", icon: "danger"});
    }
  }

  render() {
    const { registerInput, registerProcess } = this.state;
    const radio_props = [
      {label: 'User', value: 'user' },
      {label: 'Admin', value: 'admin' }
    ];
    return (
      <ScrollView style={styles.formContainer}>
        <View>
          <RadioForm
            radio_props={radio_props}
            initial={0}
            formHorizontal={true}
            labelHorizontal={true}
            animation={true}
            onPress={this.textChangeHandler.bind(this, 'type')}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>First Name</Text>
          <TextInput
            placeholder='First Name...'
            style={styles.inputTextBox}
            value={registerInput.firstName}
            onChangeText={this.textChangeHandler.bind(this, 'firstName')}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Last Name</Text>
          <TextInput
            placeholder='Last Name...'
            style={styles.inputTextBox} 
            value={registerInput.lastName}
            onChangeText={this.textChangeHandler.bind(this, 'lastName')}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Mobile Number</Text>
          <TextInput 
            style={[styles.inputTextBox]}
            placeholder="Mobile..."
            value={registerInput.mobile}
            onChangeText={this.textChangeHandler.bind(this, 'mobile')}
            maxLength={10}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Upload Photo</Text>
          {registerInput.image !== 'NA' && <Image source={{ uri: `data:image/png;base64,${registerInput.image}` }} style={{ width: 200, height: 200 }} />}
          <Button title="Pick an image from camera roll" onPress={this._pickImage} />
        </View>
        <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
          <View style={{width: 150}}>
            <Button 
              title="Submit" 
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
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  formContainer: {
    margin: 30,
    flexDirection: 'column'
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
    color: '#778899',
    marginBottom: 5
  },
  inputTextareaBox: {
    height: 100,
    textAlignVertical: 'top'
  }
});

export default Registration;
