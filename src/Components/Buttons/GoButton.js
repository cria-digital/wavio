import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons';
import { Primary, DescricaoBold } from "../../Styles"

import { translate } from '../../Locales'
const t = translate

const GoButon = (props) => {
	return (
		<TouchableOpacity onPress={() => props.press()} disabled={props.disabled}>
			{
				props.valid ? 
				<View style={[styles.gradient, {width: props.width, backgroundColor: '#767676'}]}>
					{
						props.title ? <Text style={styles.txt}>{props.title}</Text> : null
					}
					<Icon name="arrow-forward-outline" size={23} color="white" />
				</View>
				: <LinearGradient colors={['#eba358', '#df1884']} style={[styles.gradient, {width: props.width}]}>
				{
					props.title ? <Text style={styles.txt}>{props.title}</Text> : null
				}
         	<Icon name="arrow-forward-outline" size={23} color="white" />
         	</LinearGradient>
			}
			
		</TouchableOpacity>
	)
}

var styles = StyleSheet.create({
  	gradient: {
    	height: 52,
    	borderRadius:20,
    	flexDirection:"row",
    	justifyContent:"space-evenly",
    	alignItems:"center"
  	},
  	txt: {
  		color: "white",
  		fontFamily: DescricaoBold,
  		fontSize: 14,
  		fontWeight: 'bold' 
  	}
});

export default GoButon