import React, { Component } from 'react'
import {
   View,
   ListView,
   Text,
   StyleSheet
} from 'react-native'

export default MyPresentationalComponent = (props) => {
   return (
      <View>
         <ListView
            style = {styles.listContainer}
            dataSource = {props.dataSource}
            renderRow = {
               (rowData) => (
                  <Text style = {styles.listItem}>
                     {rowData}
                  </Text>
               )
            }
         />
      </View>
   )
}

const styles = StyleSheet.create ({
   listContainer: {
      paddingTop: 22
   },
   listItem: {
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
   }
})
