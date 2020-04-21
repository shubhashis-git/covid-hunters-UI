import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Avatar } from 'react-native-elements';
import Logout from './Logout';
import { QRCode } from 'react-native-custom-qr-codes-expo';
import { SharedServices } from '../services/SharedServices';

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
        <Logout navigation={this.props.navigation} top='30' />

        <View style={{ marginTop: 150, position: 'relative', width: '80%' }}>
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
  avatar: {
    position: 'absolute',
    top: -40,
    left: '30%',
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
