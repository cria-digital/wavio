import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Primary } from "../../Styles"

const BackButon = (props) => {
	return (
		<TouchableOpacity style={styles.button} onPress={() => props.press()}>
			<Icon name="arrow-back" size={23} color={Primary} />
		</TouchableOpacity>
	)
}

var styles = StyleSheet.create({
  	button: {
    	width: 100,
    	height: 52,
    	borderRadius:20,
    	justifyContent:"center",
    	alignItems:"center",
    	borderWidth: 2,
    	borderColor: Primary
  	}
});

export default BackButon