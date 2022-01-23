import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, TextInput, PermissionsAndroid, Dimensions, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Background, Primary, Descricao, Placeholder } from '../Styles'
import LinearGradient from 'react-native-linear-gradient'

const windowWidth = Dimensions.get('window').width;

const SendPhoto = (props) => {
	const [message, setMessage] = useState("");

	return (
		<View style={styles.centeredView}>
         <ScrollView style={styles.modalView}>
          	<View style={{alignItems: 'flex-end', padding: 20, }}>
          		<TouchableOpacity styles={{alignSelf: 'center'}} onPress={() => props.dismiss()}>  
						<Icon name="close-outline" size={30} color={'white'} />
					</TouchableOpacity> 
         	</View>
					
				<View style={{justifyContent: 'center', paddingTop: 35}}>
					<Image
						style={{height: windowWidth, width: windowWidth}}
						source={{uri: props.foto.sourceURL}}
					/>
					

	           	<View style={{flexDirection: 'row', height: 82, backgroundColor: Background, alignItems: 'center', paddingHorizontal: 30}}>
						<View style={{backgroundColor: '#2D2D2D', height: 40, flex: 1, borderRadius: 20, paddingLeft:10, color: 'white', flexDirection: 'row', }}>
							<TextInput
								onChangeText={(text) => setMessage(text)}
								value={message}
								placeholder='Type your message'
								placeholderTextColor='gray'
								style={{flex: 1, color: 'white'}}
							/>
						</View>
						<TouchableOpacity onPress={() => {props.send(message), props.dismiss(), setMessage('')}}>
							<LinearGradient 
								colors={['#eba358', '#df1884']} 
								style={{height: 40, width: 40, borderRadius: 20, marginLeft: 10, justifyContent: 'center', alignItems: 'center'}}
							>
								<Icon name="paper-plane-outline" size={18} color={'white'} />
							</LinearGradient>
						</TouchableOpacity>
					</View>
				</View>
         </ScrollView>
      </View>
	)
}

const styles = StyleSheet.create({
	centeredView: {
    	flex: 1
  	},
  	modalView: {
  		flex: 1,
    	backgroundColor: 'rgba(0,0,0, 0.8)',
    	shadowColor: "#000",
    	shadowOffset: {
      	width: 0,
      	height: 2
    	},
    	shadowOpacity: 0.25,
    	shadowRadius: 4,
    	elevation: 5
  	},
})

export default SendPhoto