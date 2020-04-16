import React, {Component} from 'react';
import { View, Text, AsyncStorage, StyleSheet, Alert } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  async UNSAFE_componentWillMount() {
    try {
      let loggedInUser = await AsyncStorage.getItem('loggedInUser');
      if (loggedInUser) {
        loggedInUser = JSON.parse(loggedInUser);
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
              source={{
                uri: loggedInUser.avatar,
              }}
            />
            <View>
              <Text style={styles.headerTitleText}>
                {`${loggedInUser.fname} ${loggedInUser.lname}`}
              </Text>
            <Text style={styles.headerTitleText}>{loggedInUser.mobile}</Text>
            </View>
          </View>
        );
      },
      headerRight: () => {
        return (
          <View style={{marginBottom: 100, marginRight: 10 }}>
            <Ionicons name="md-log-out" size={30} color="#fff8dc" onPress={this.logOut.bind(this)} />
          </View>
        );
      }
    });
  }

  logOut = () => {
    Alert.alert(
      'Logout',
      'Are you sure ?',
      [
        {
          text: 'No',
          style: 'cancel'
        },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              this.props.navigation.navigate('Login');
            } catch (error) {
              console.log(error);
            }
          }
        }
      ]
    );
  }

  render() {
    return (
      <View style={styles.container}>
        
        
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
