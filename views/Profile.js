import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Avatar } from 'react-native-elements';
import Logout from './Logout';
// import { QRCode } from 'react-native-custom-qr-codes-expo';
import { SharedServices } from '../services/SharedServices';
import { showMessage } from "react-native-flash-message";

const image = require("../assets/blue_texture.jpg");

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
      // let loggedInUser = this.sharedService.getItem('loggedInUser');
      let loggedInUser = {
        id: 2,
        email: 'biswajit.manna@cognizant.com',
        firstName: 'Biswajit',
        last_name: 'Manna',
        avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg',
        role: 'user',
        mobile: '9836252196',
        status: 'normal'
      };

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
            <View style={{ backgroundColor: this.statusObj[status] }}>
              <View style={{ height: 120 }}>
                <Avatar style={styles.avatar}
                  size={140}
                  rounded
                  source={{ uri: `data:image/png;base64,${loggedInUser.image}` }}
                />
              </View>
              <View style={styles.headerTitleContainer}>
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
                  <View style={{ borderWidth: 2, borderColor: '#191970', width: 205 }}>
                    {/* <QRCode
                    codeStyle='square'
                    content={qrCodeData}
                    size={200} color='#191970'
                  /> */}
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
    width: '100%',
  },
  imageWrapper: {
    marginTop: 150,
    position: 'relative',
    marginHorizontal: 50,
    justifyContent: "center",
    flexDirection: 'column'
  },
  avatar: {
    position: 'absolute',
    top: -40,
    left: '30%',
    width: 140,
    height: 140
  },
  headerTitleContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  headerTitleText: {
    color: '#fff8dc',
    fontSize: 18
  }
});

export default Profile;
