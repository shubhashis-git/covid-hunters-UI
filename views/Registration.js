import React, {Component} from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Image } from 'react-native';
import { Button } from 'react-native-elements';
import {UserRegister} from  '../services/ApiService';
import { showMessage } from "react-native-flash-message";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import RadioForm from 'react-native-simple-radio-button';

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      registerInput: {
        firstName: '',
        lastName: '',
        type: 'User',
        mobile: '',
        image: null
      },
      registerProcess: false
    };

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
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
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
    if (firstName && lastName && mobile && image) {
      return true;
    } else {
      return false;
    }
  }

  registerHandler = async () => {
    if (this.formValidate()) {
      const {registerInput} = this.state;
      if (registerInput) {
        this.setState({registerProcess: true});
        UserRegister(registerInput).then(resp => {
          this.setState({registerProcess: false});
          if (resp.status === 200) {
            showMessage({message: "Registration Successful", description: resp.data, type: "primary", icon: "primary"});
          } else {
            showMessage({message: "Registration Failed", description: resp.data, type: "danger", icon: "danger"});
          }
        });
      }
    } else {
      showMessage({message: "Validation Failed", description: 'All fields are required.', type: "danger", icon: "danger"});
    }
  }

  render() {
    const { registerInput, registerProcess } = this.state;
    const radio_props = [
      {label: 'User', value: 'User' },
      {label: 'Admin', value: 'Admin' }
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
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Upload Photo</Text>
          {registerInput.image && <Image source={{ uri: `data:image/gif;base64,${registerInput.image}` }} style={{ width: 200, height: 200 }} />}
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
