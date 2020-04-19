import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native'
import { Card, Button, Overlay, CheckBox } from 'react-native-elements'
import RadioButton from 'react-native-radio-button'

class AdminPersonDetails extends Component {
  constructor(props) {
    super(props);
    this.setStatus = this.setStatus.bind(this);
  }

  state = {
    modalVisible: false,
    status: 'normal'
  };

  statusArr = [
    { name: 'normal', color: 'green' },
    { name: 'suspected', color: '#ff7600' },
    { name: 'infected', color: 'red' },
    { name: 'isolated', color: '#ff4f90' }];

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  setStatus() {
    console.log('status = ', this.state.status);
    this.setModalVisible(false);
  }

  render() {
    const { modalVisible, status } = this.state;

    return (
      <View style={styles.container}>
        <Card>
          <Image
            style={{ width: 200, height: 200, marginVertical: 0, marginHorizontal: 'auto' }}
            source={require('../assets/man.jpeg')}
          />
          <Text style={{ marginBottom: 10, marginTop: 30 }}>
            Phone: 9876543210
    </Text>
          <Text style={{ marginBottom: 30 }}>
            Status: Normal
    </Text>
          <Button onPress={() => this.setModalVisible(true)}
            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
            title='Change Status' />
        </Card>

        {
          modalVisible && (
            <Overlay isVisible={modalVisible} style={styles.overlay}
              onBackdropPress={() => this.setModalVisible(false)}>
              <View>
                <Text style={styles.statusHeader}>
                  Change the health status of the person under screening
                  </Text>

                {this.statusArr.map(item => {
                  return (
                    <View key={item.name} style={styles.radioContainer}>
                      <RadioButton
                        animation={'bounceIn'}
                        isSelected={item.name === status}
                        onPress={() => this.setState({ status: item.name })}
                      />

                      <Text style={[styles.radioText, { color: item.color }]}>{item.name}</Text>
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
