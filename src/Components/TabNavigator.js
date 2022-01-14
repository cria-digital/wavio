import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import { BlurView, VibrancyView } from "@react-native-community/blur";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Primary } from '../Styles'

const { width, height } = Dimensions.get('window');
const altura = height-30;

const TabNavigator = (props) => {
	const loggued = props.focused

  	return(
  		<View style={styles.absolute}>
  			{
  				Platform.select({
  					ios: <BlurView
						style={styles.container}
						blurType="light"
						blurAmount={0.1}
						reducedTransparencyFallbackColor="white"
					>	
						<View style={styles.container}>
							<TouchableOpacity style={[styles.containerIcon, 
								{ backgroundColor: loggued == 'Home' ? Primary : 'transparent'}
							]} onPress={() => props.callback('Home')}>
			            	<Ionicons name={'home'} size={23} color={'white'} />
			            </TouchableOpacity>
			            <TouchableOpacity style={[styles.containerIcon, 
								{ backgroundColor: loggued == 'Events' ? Primary : 'transparent'}
							]} onPress={() => props.callback('Events')}>
			            	<Ionicons name={'compass'} size={23} color={'white'} />
			            </TouchableOpacity>
			            <TouchableOpacity style={[styles.containerIcon, 
								{ backgroundColor: loggued == 'Chats' ? Primary : 'transparent'}
							]} onPress={() => props.callback('Chats')}>
			            	<Ionicons name={'chatbubble-ellipses'} size={23} color={'white'} />
			            </TouchableOpacity>
			            <TouchableOpacity style={[styles.containerIcon, 
								{ backgroundColor: loggued == 'Hangouts' ? Primary : 'transparent'}
							]} onPress={() => props.callback('Hangouts')}>
			            	<Ionicons name={'people'} size={23} color={'white'} />
			            </TouchableOpacity>
						</View>
					</BlurView>,
					android: <View style={styles.containerAndroid}>
						<View style={styles.container}>
							<TouchableOpacity style={[styles.containerIcon, 
								{ backgroundColor: loggued == 'Home' ? Primary : 'transparent'}
							]} onPress={() => props.callback('Home')}>
			            	<Ionicons name={'home'} size={23} color={'white'} />
			            </TouchableOpacity>
			            <TouchableOpacity style={[styles.containerIcon, 
								{ backgroundColor: loggued == 'Events' ? Primary : 'transparent'}
							]} onPress={() => props.callback('Events')}>
			            	<Ionicons name={'compass'} size={23} color={'white'} />
			            </TouchableOpacity>
			            <TouchableOpacity style={[styles.containerIcon, 
								{ backgroundColor: loggued == 'Chats' ? Primary : 'transparent'}
							]} onPress={() => props.callback('Chats')}>
			            	<Ionicons name={'chatbubble-ellipses'} size={23} color={'white'} />
			            </TouchableOpacity>
			            <TouchableOpacity style={[styles.containerIcon, 
								{ backgroundColor: loggued == 'Hangouts' ? Primary : 'transparent'}
							]} onPress={() => props.callback('Hangouts')}>
			            	<Ionicons name={'people'} size={23} color={'white'} />
			            </TouchableOpacity>
						</View>
					</View>
  				})
  			}

		</View>
  	);
}
	

const styles = StyleSheet.create({
	absolute: {
    	position: "absolute",
    	width,
    	//height: '4%',
    	top: Platform.OS === 'ios' ? '94%' : '86%',
    	alignItems: "center",
    	justifyContent: "flex-end",
    	backgroundColor:'transparent'
  	},
 	container: {
 		flexDirection: "row",
    	justifyContent: "space-around",
   	alignItems: "center",
    	height: 76,
    	width: '90%',
    	borderRadius: 20
 	},
 	containerAndroid: {
 		flexDirection: "row",
    	justifyContent: "space-around",
   	alignItems: "center",
    	height: 76,
    	width: '90%',
    	borderRadius: 20,
		shadowOpacity: 1,
		shadowColor: '#000',
		shadowOffset: { width: 10, height: 10 },
		shadowRadius: 5,
		elevation: 5,
		backgroundColor: "rgba(255, 255, 255, 0.3)"
 	},
  	containerIcon: {
	   height: 60, 
	   width: 60, 
	   borderRadius: 20,
	   alignItems: 'center',
	   justifyContent: 'center'
  	}

});

export default TabNavigator



	

