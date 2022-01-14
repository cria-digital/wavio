import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons';
import { Primary, DescricaoBold, Descricao } from "../Styles"

import { translate } from '../Locales'
const t = translate

const SaveCancelBar = (props) => {
	return(
		<View style={{flexDirection: 'row', flex: 1}}>
			<TouchableOpacity style={styles.button} onPress={() => props.press()}>
				<Text style={[styles.txt, { color: Primary}]}>
				  {t("Cancelar")}
				</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => props.callback()} style={{flex: 1, marginLeft: 10}} disabled={props.disabled}>
				<LinearGradient colors={['#eba358', '#df1884']} style={styles.gradient}>
         		<Text style={[styles.txt, { color: 'white'}]}>
				  		{t(props.title)}
					</Text>
         	</LinearGradient>
		</TouchableOpacity>
		</View>
	)
}

const styles = StyleSheet.create({
	button: {
    	flex: 1,
    	height: 52,
    	marginRight: 10,
    	borderRadius:20,
    	justifyContent:"center",
    	alignItems:"center",
    	borderWidth: 2,
    	borderColor: Primary
  	},
  	gradient: {
  		flex: 1,
    	height: 52,
    	borderRadius:20,
    	justifyContent:"center",
    	alignItems:"center"
  	},
  	txt: {
  		fontWeight: '700',
  		fontFamily: Descricao,
  		fontSize: 14
  	}
})

export default SaveCancelBar