import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'

class AdminPersonDetails extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
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
        <Button
          buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
          title='Change Status' />
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 30
  }
});

export default AdminPersonDetails;
