import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Avatar } from 'react-native-elements';
import Logout from './Logout';
import { QRCode } from 'react-native-custom-qr-codes-expo';
import { SharedServices } from '../services/SharedServices';
import { showMessage } from "react-native-flash-message";

const image = require("../assets/blue_texture.png");

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qrCodeData: null,
      loggedInUser: null,
      status: 'normal'
    };

    this.sharedService = SharedServices();
  }

  statusObj = {
    normal: 'green',
    suspected: '#ff7600',
    infected: 'red',
    isolated: '#ff4f90'
  };

  async UNSAFE_componentWillMount() {
    try {
      let loggedInUser = this.sharedService.getItem('loggedInUser');

      this.setState({ qrCodeData: loggedInUser.mobile });
      this.setState({ loggedInUser: loggedInUser });

      this.props.navigation.setOptions({
        headerLeft: null,
        headerRight: () => <Logout navigation={this.props.navigation} top='10' />
      });

      const request = new XMLHttpRequest();
      request.open("POST", "https://rest-grateful-meerkat-km.eu-gb.mybluemix.net/get-conditions");
      request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      request.send(JSON.stringify({ mobile: loggedInUser.mobile }));
      request.onreadystatechange = e => {
        if (request.readyState !== 4) {
          return;
        }

        if (request.status === 200) {
          const successdata = JSON.parse(request.responseText);
          if (!successdata || (successdata && !successdata.length)) {
            this.setState({ status: 'normal' });
          } else {
            this.setState({ status: successdata[0].status });
          }
        } else {
          showMessage({ message: "Status not found", description: 'Status not found. PLease try again', type: "danger", icon: "danger" });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { qrCodeData, loggedInUser, status } = this.state;

    if (!loggedInUser) return null;

    return (
      <View style={styles.headerTitleContainer}>
        <ImageBackground source={image} style={styles.image}>
          <View style={styles.imageWrapper}>
            <View style={[styles.wrapper, { backgroundColor: this.statusObj[status] }]}>
              <View style={{ height: 120 }}>
                <Avatar style={styles.avatar}
                  size={170}
                  rounded
                  source={{ uri: `data:image/png;base64,${loggedInUser.image}` }}
                />
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.headerTitleText}>
                  {`${loggedInUser.firstName} ${loggedInUser.lastName}`}
                </Text>
                <Text style={styles.headerTitleText}>{loggedInUser.mobile}</Text>
                <Text style={[styles.headerTitleText, { textTransform: 'capitalize' }]}>
                  {status}
                </Text>
              </View>
              <View style={styles.container}>
                {qrCodeData &&
                  <View style={{ borderWidth: 2, borderColor: '#191970', width: 260 }}>
                    <QRCode
                      codeStyle='square'
                      content={qrCodeData}
                      size={250} color='#191970'
                    />
                  </View>
                }
              </View>
            </View>
          </View>
        </ImageBackground>
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
  image: {
    flex: 1,
    width: '100%'
  },
  imageWrapper: {
    marginTop: 130,
    position: 'relative',
    marginHorizontal: 50,
    justifyContent: "center",
    flexDirection: 'column'
  },
  avatar: {
    marginTop: -60,
    width: 160,
    height: 160
  },
  wrapper: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  headerTitleContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    height: 180,
    width: '100%'
  },
  headerTitleText: {
    color: '#fff8dc',
    fontSize: 18
  }
});

export default Profile;
