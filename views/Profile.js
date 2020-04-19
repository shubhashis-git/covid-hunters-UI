import React, {Component} from 'react';
import { View, Text, AsyncStorage, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import Logout from './Logout';
import {QRCode} from 'react-native-custom-qr-codes-expo';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qrCodeData: null
    };
  }

  async UNSAFE_componentWillMount() {
    try {
      let loggedInUser = await AsyncStorage.getItem('loggedInUser');
      if (loggedInUser) {
        loggedInUser = JSON.parse(loggedInUser);
        this.setState({qrCodeData: loggedInUser.mobile});
        this.displayHeader(loggedInUser);
      }
    } catch (error) {
      console.log(error);
    }    
  }

  displayHeader = (loggedInUser) => {
    
    this.props.navigation.setOptions({
      headerStyle: {
        height: 280,
        backgroundColor: '#228b22',
      },
      headerLeft: null,
      headerTitle: () => {
        return (
          <View style={styles.headerTitleContainer}>
            <Avatar
              size={140}
              rounded
              source={{uri: loggedInUser.avatar}}
            />
            <View>
              <Text style={styles.headerTitleText}>
                {`${loggedInUser.first_name} ${loggedInUser.last_name}`}
              </Text>
            <Text style={styles.headerTitleText}>{loggedInUser.mobile}</Text>
            </View>
          </View>
        );
      },
      headerRight: () => <Logout navigation={this.props.navigation} />
    });
  }

  render() {
    const {qrCodeData} = this.state;
    return (
      <View style={styles.container}>
        {qrCodeData &&
          <View style={{borderWidth: 2, borderColor: '#191970', width: 205}}>
            <QRCode 
              codeStyle='square' 
              content={qrCodeData} 
              size={200} color='#191970'
            />
          </View>
        }    
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 30
  },
  headerTitleContainer: {
    marginLeft: 40, 
    flexDirection: 'column',
    alignItems: 'center' 
  },
  headerTitleText: {
    color: '#fff8dc', 
    fontSize: 15
  }
});

export default Profile;
