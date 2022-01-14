import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Descricao, Titulo } from '../../Styles' 
import Icon from 'react-native-vector-icons/Ionicons';

import { translate } from '../../Locales'
const t = translate

const index = (props) => {

	const renderAvatar = () => {
		return props.user.photos.map((item,index) => {
			return item.profile ? 
				<Image
					style={{height: 40, width: 40, borderRadius: 5}}
					source={{uri: item.url}}
					key={index}
					resizeMode='cover'
				/>
			: null
		})
	}

	return (
		<View style={styles.header}>
			<View style={{flexDirection: 'row', flex:3, alignItems: 'center'}}>
				<TouchableOpacity onPress={() => props.press()}>
					{renderAvatar()}
				</TouchableOpacity>
				<View style={{marginLeft: 10}}>
					<Text style={styles.txtWelcome}>
						{t("Bem Vindo")}
					</Text>
					<Text style={styles.txtUser}>
						{props.user.name}
					</Text>
				</View>
			</View>
			<View style={{alignItems: 'center'}}>
				<TouchableOpacity style={{alignItems: 'center'}} onPress={() => props.pressIcon()}>
					{
						props.profile ? <Icon name="settings-outline" size={30} color={'#848484'} />
						: <Icon name="notifications-outline" size={30} color={'#848484'} />
					}
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		margin: 30 
	},
	txtWelcome: {
		fontFamily: Descricao,
		color: 'white',
		fontSize: 10
	},
	txtUser: {
		fontFamily: Titulo,
		fontSize: 14,
		color: 'white'
	}
})

export default index

