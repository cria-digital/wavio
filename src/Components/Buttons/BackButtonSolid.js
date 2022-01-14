import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Primary } from "../../Styles"

const BackButonSolid = (props) => {
	return (
		<TouchableOpacity style={styles.button} onPress={() => props.callback()}>
			<Icon name="arrow-back" size={23} color={"white"} />
		</TouchableOpacity>
	)
}

var styles = StyleSheet.create({
  	button: {
    	width: 58,
    	height: 52,
    	borderRadius:20,
    	justifyContent:"center",
    	alignItems:"center",
    	backgroundColor: Primary
  	}
});

export default BackButonSolid