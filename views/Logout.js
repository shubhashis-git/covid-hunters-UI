import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, AsyncStorage, Alert } from 'react-native';

class Logout extends Component {
  constructor(props) {
    super(props);
  }

  logOut = () => {
    Alert.alert(
      'Logout',
      'Are you sure?',
      [
        {
          text: 'No',
          style: 'cancel'
        },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              this.props.navigation.navigate('Login');
            } catch (error) {
              console.log(error);
            }
          }
        }
      ]
    );
  }

  render() {
    const top = parseInt(this.props.top);
    return (
      <View style={{ marginRight: 10, position: 'absolute', right: 10, top: top }}>
        <Ionicons
          name="md-log-out"
          size={30}
          color="#b22222"
          onPress={this.logOut.bind(this)}
        />
      </View>
    );
  }
}

export default Logout;
