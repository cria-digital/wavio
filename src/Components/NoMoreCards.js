import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Primary } from '../Styles';

const NoMoreCards = (props) => {
	return (
		<View style={{justifyContent: 'space-between', flexDirection: 'row', paddingTop: 30, paddingHorizontal: 30}}>
         <TouchableOpacity style={styles.button} onPress={() => props.voltar()}>
            <Icon name="arrow-back" size={23} color={"white"} />
         </TouchableOpacity>
      </View>
	)
}

const styles = StyleSheet.create({
	button: {
      width: 58,
      height: 52,
      borderRadius:20,
      justifyContent:"center",
      alignItems:"center",
      backgroundColor: Primary,
      shadowOpacity: 1,
      shadowColor: '#000',
      shadowOffset: { width: 10, height: 10 },
      shadowRadius: 5,
      //elevation: 5,
   }
})

export default NoMoreCards