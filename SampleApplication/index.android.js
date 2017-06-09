/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {
  AppRegistry,
  ListView,
  Text,
  StyleSheet,
  ToolbarAndroid,
  TouchableHighlight,
  Navigator,
  View
} from 'react-native';
import MyPresentationalComponent from './app/src/component/MyPresentationalComponent';
var API_URL = 'http://www.foodq.co.in/reactnative/qrss/';
// var API_URL = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=94043&mode=json&units=metric&cnt=14&APPID=18dcba27e5bca83fe4ec6b8fbeed7827';
export default class SampleApplication extends Component {

  componentDidMount() {

    return fetch(API_URL)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ isLoading: false, jsonData: responseJson });
        console.log(responseJson);
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  }



  constructor(props) {
    super(props);
    // const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    // this.state = {
    //   dataSource: ds.cloneWithRows([
    //     'Item1', 'Item2', 'Item3', 'Item4', 'Item5', 'Item6', 'Item7', 'Item8',
    //     'Item9', 'Item10'
    //   ])
    // };

    this.state = { isLoading: true, jsonData: '' }
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
  }
  /*render() {
     return (
        <View>
           <MyPresentationalComponent dataSource = {this.state.dataSource} />
        </View>
     );
  }*/
  showPopover(){
    navigate('SecondScreen');
  }

  render() {
    const rows = this.dataSource.cloneWithRows(this.state.jsonData.items || [])
    if (this.state.isLoading != true) {
      return (
        <View style={styles.container}>
          <ToolbarAndroid
            style={styles.baseToolbar}
            logo={require('./images/ic_launcher.png')}
            title="Sunshine"
            titleTextColor="red" />
          <View style={styles.viewcontainer}>
            <Text style={styles.textStyle}>{this.state.jsonData.channel.title}</Text>
            <ListView
              renderSeparator={(sectionID, rowID) =>
                <View key={`${sectionID}-${rowID}`} style={styles.separator} />
              }
              style={styles.listView}
              dataSource={rows}
              renderRow={(rowData) =>
                <TouchableHighlight onPress={this.showPopover}
                 underlayColor='rgba(73,182,77,1,0.9)'>
                  <Text style={styles.rowTextStyle}>{rowData.title}</Text>
                </TouchableHighlight>
              }
            />
          </View>
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <ToolbarAndroid
            style={styles.baseToolbar}
            logo={require('./images/ic_launcher.png')}
            title="Sunshine"
            titleTextColor="red" />
          <View style={styles.singleviewcontainer}>
            <Text>Loading...</Text>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  separator: {
    height: 2,
    backgroundColor: '#000000',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 28,
    marginBottom: 10,
    color: '#000000',
  },
  rowTextStyle: {
    justifyContent: 'center',
    fontSize: 18,
    padding: 10,
  },
  listView: {
    padding: 10,
    backgroundColor: '#FFFFFF'
  },
  baseToolbar: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

  viewcontainer: {
    textAlign: 'center',
    color: '#000000',
    marginBottom: 25,
    padding: 10,
  },

  singleviewcontainer: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


AppRegistry.registerComponent('SampleApplication', () => SampleApplication);
