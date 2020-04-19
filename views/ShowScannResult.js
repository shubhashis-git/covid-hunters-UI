import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';

class ShowScannResult extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {scannedData} = this.props;
    return (
      <View style={styles.modalContent}>
        <Text>{scannedData}</Text>
        <Text>Biswajit Manna</Text>
        <Text>Status: Good</Text>
        <Text>Last Updated 7 days ago</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalContent: {
    flexDirection: 'column'
  }
});

export default ShowScannResult;
