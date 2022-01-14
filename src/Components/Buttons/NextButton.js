import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons';

const NextButton = (props) => {
	return (
		<TouchableOpacity onPress={() => props.callback()}>
			<LinearGradient colors={['#eba358', '#df1884']} style={styles.gradient}>
         	<Icon name="arrow-forward-outline" size={23} color="white" />
         </LinearGradient>
		</TouchableOpacity>
	)
}

var styles = StyleSheet.create({
  	gradient: {
    	width: 100,
    	height: 52,
    	borderRadius:20,
    	justifyContent:"center",
    	alignItems:"center"
  	}
});

export default NextButton