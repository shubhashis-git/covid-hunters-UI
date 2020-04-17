import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Alert, Modal, TouchableHighlight } from 'react-native'
import { Card, Button } from 'react-native-elements'

class AdminPersonDetails extends Component {
  constructor(props) {
    super(props);
    this.showModal = this.showModal.bind(this);
  }

  state = {
    modalVisible: false
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
    // setTimeout(() => this.setState({ modalVisible: visible }), 600)
  }

  showModal() {
    console.log('showModal');
    this.setModalVisible(true);
  }

  render() {
    const { modalVisible } = this.state;
    console.log('modalVisible = ', modalVisible);
    return (
      <View>
        <Card style={styles.cardView}>
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
          <Button onPress={this.showModal}
            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
            title='Change Status' />
        </Card>

        {
          modalVisible && (
            <View style={styles.centeredView}>
              <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>Hello World!</Text>

                    <TouchableHighlight
                      style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                      onPress={() => {
                        this.setModalVisible(!modalVisible);
                      }}
                    >
                      <Text style={styles.textStyle}>Hide Modal</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal>

              <TouchableHighlight
                style={styles.openButton}
                onPress={() => {
                  this.setModalVisible(true);
                }}
              >
                <Text style={styles.textStyle}>Show Modal</Text>
              </TouchableHighlight>
            </View>
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 30
  },
  cardView: {
    flex: 1
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default AdminPersonDetails;
