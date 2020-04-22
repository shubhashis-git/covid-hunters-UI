import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native'
import { Card, Button, Overlay } from 'react-native-elements'
import RadioButton from 'react-native-radio-button'

const image = require("../assets/blue_texture.png");

class AdminPersonDetails extends Component {
  constructor(props) {
    super(props);
    this.setStatus = this.setStatus.bind(this);
  }

  state = {
    modalVisible: false,
    status: 'normal',
    selectedStatus: 'normal'
  };

  statusObj = {
    normal: 'green',
    suspected: '#ff7600',
    infected: 'red',
    isolated: '#ff4f90'
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  setStatus() {
    const { selectedStatus } = this.state;

    const peronData = this.props.route.params.data;

    const request = new XMLHttpRequest();
    request.open("POST", "https://rest-grateful-meerkat-km.eu-gb.mybluemix.net/add-condition");
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    request.send(JSON.stringify({
      mobile: peronData.mobile,
      status: selectedStatus,
      date: new Date().toISOString().slice(0, 10)
    }));

    request.onreadystatechange = e => {
      if (request.readyState !== 4) {
        return;
      }

      if (request.status === 200) {
        this.setState({ status: selectedStatus });
        console.log(peronData.deviceId);

        this.setModalVisible(false);

        fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'accept-encoding': 'gzip, deflate',
            'host': 'exp.host'
          },
          body: JSON.stringify({
            to: peronData.deviceId,
            sound: 'default',
            title: 'Be Safe',
            body: 'Your health status has been changed'
          }),
          }).then((response) => response.json())
          .then((responseJson) => { 
            console.log(responseJson);
          })
          .catch((error) => { console.log(error) });
      } else {
        showMessage({ message: "Update failed Failed", description: 'Search login. PLease try again', type: "danger", icon: "danger" });
      }
    }
  }

  async UNSAFE_componentWillMount() {
    const peronData = this.props.route.params.data;

    const request = new XMLHttpRequest();
    request.open("POST", "https://rest-grateful-meerkat-km.eu-gb.mybluemix.net/get-conditions");
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify({ mobile: peronData.mobile }));
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

        const currentStatus = this.state.status;
        this.setState({ selectedStatus: currentStatus });
      } else {
        showMessage({ message: "Search Failed", description: 'Search login. PLease try again', type: "danger", icon: "danger" });
      }
    }
  }

  render() {
    const { modalVisible, status, selectedStatus } = this.state;
    const personDetails = this.props.route.params.data;
    const imageUrl = personDetails.image ? { uri: `data:image/png;base64,${personDetails.image}` } : defaultImg;
    const statusColor = this.statusObj[status];

    return (
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.image}>
          <Card>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Image
                style={{
                  backgroundColor: '#f1eff0', width: 200, height: 200,
                  borderWidth: 5, borderColor: statusColor
                }}
                source={imageUrl}
              />
            </View>
            <Text style={{ marginTop: 30 }}>
              Name: {personDetails.firstName} {personDetails.lastName}
            </Text>
            <Text style={{ marginBottom: 10, marginTop: 10 }}>
              Phone: {personDetails.mobile}
            </Text>
            <Text style={{ marginBottom: 30, textTransform: 'capitalize' }}>
              Status: {status}
            </Text>
            <Button onPress={() => this.setModalVisible(true)}
              buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
              title='Change Status' />
          </Card>
        </ImageBackground>

        {
          modalVisible && (
            <Overlay isVisible={modalVisible} style={styles.overlay} height='60%'
              onBackdropPress={() => this.setModalVisible(false)}>
              <View>
                <Text style={styles.statusHeader}>
                  Change the health status of the person under screening
                  </Text>

                {Object.keys(this.statusObj).map(key => {
                  let color = this.statusObj[key];
                  return (
                    <View key={key} style={styles.radioContainer}>
                      <RadioButton
                        animation={'bounceIn'}
                        isSelected={key === selectedStatus}
                        onPress={() => this.setState({ selectedStatus: key })}
                      />

                      <Text style={[styles.radioText, { color }]}>{key}</Text>
                    </View>
                  )
                })}

                <Button onPress={this.setStatus}
                  buttonStyle={{ borderRadius: 0, margin: 20 }}
                  title='Set Status' />
              </View>
            </Overlay>
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%'
  },
  image: {
    flex: 1
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderWidth: 0
  },
  statusHeader: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
    marginBottom: 20
  },
  radioContainer: {
    flexDirection: 'row',
    margin: 20
  },
  radioText: {
    marginLeft: 20,
    textTransform: 'capitalize',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default AdminPersonDetails;
