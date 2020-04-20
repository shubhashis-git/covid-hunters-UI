import React, { Component } from 'react';
import { View, Text, AsyncStorage, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-elements';
import Logout from './Logout';
import { QRCode } from 'react-native-custom-qr-codes-expo';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qrCodeData: null,
      loggedInUser: null
    };
  }

  async UNSAFE_componentWillMount() {
    try {
      let loggedInUser = await AsyncStorage.getItem('loggedInUser');
      if (loggedInUser) {
        loggedInUser = JSON.parse(loggedInUser);
        this.setState({ qrCodeData: loggedInUser.mobile });
        this.setState({ loggedInUser: loggedInUser });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { qrCodeData, loggedInUser } = this.state;

    if (!loggedInUser) return null;

    return (
      <View style={styles.headerTitleContainer}>
        <Logout navigation={this.props.navigation} top='30' />

        <View style={{ marginTop: 150, position: 'relative', width: '80%' }}>
          <View style={styles.profileContainer}>
            <View style={{ height: 120 }}>
              {loggedInUser.image === 'NA' &&
                <Avatar style={styles.avatar}
                  size={140}
                  rounded
                  source={{ uri: loggedInUser.image }}
                />
              }
              {loggedInUser.image !== 'NA' &&
                <Avatar style={styles.avatar}
                  size={140}
                  rounded
                  source={{ uri: loggedInUser.image }}
                />
              }
            </View>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitleText}>
                {`${loggedInUser.firstName} ${loggedInUser.lastName}`}
              </Text>
              <Text style={styles.headerTitleText}>{loggedInUser.mobile}</Text>
              <Text style={[styles.headerTitleText, { textTransform: 'capitalize' }]}>
                {loggedInUser.status}
              </Text>
            </View>
            <View style={styles.container}>       
              {qrCodeData &&
                <View style={{ borderWidth: 2, borderColor: '#191970', width: 205 }}>
                  <QRCode
                    codeStyle='square'
                    content={qrCodeData}
                    size={200} color='#191970'
                  />
                </View>
              }
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 30,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  profileContainer: {
    backgroundColor: 'green',
  },
  avatar: {
    position: 'absolute',
    top: -40,
    left: '34%',
    width: 140,
    height: 140
  },
  headerTitleContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  headerTitleText: {
    color: '#fff8dc',
    fontSize: 18
  }
});

export default Profile;
