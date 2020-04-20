import React from 'react';
import { View, Text, Button } from 'react-native';
import { Notifications } from 'expo';

class PushNotification extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null
    };
  }

  UNSAFE_componentWillMount = async () => {
    try {
      const token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
    } catch (error) {
      console.log(error);
    }
  }

  sendNotification = () => {
    fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'accept-encoding': 'gzip, deflate',
        'host': 'exp.host'
      },
      body: JSON.stringify({
        to: 'ExponentPushToken[UP_L9aG3v8aBAgMM4eFEuC]',
        sound: 'default',
        title: 'Original Title',
        body: 'Aj Sunday...'
      }),
      }).then((response) => response.json())
      .then((responseJson) => { 
        console.log(responseJson);
      })
      .catch((error) => { console.log(error) });
  }

  render() {
    return (
      <View>
        <Text>Push Notifications</Text>
        <Button title="Send Notification" onPress={this.sendNotification.bind(this)} />
      </View>
    );
  }
}

export default PushNotification;
