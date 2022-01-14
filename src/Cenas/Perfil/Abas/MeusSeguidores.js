import React from 'react'
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { CinzaClaro, Descricao, Placeholder, Primary } from '../../../Styles'

const Data = [
	{
		uri: require('../../../Images/UI/Rectangle333.png'),
		nome: 'Luis Sobreira',
	}
]

const Seguidores = (props) => {

	const renderItem = ({ item }) => {
    	return (
	     	<View 
	     		style={{
	     			height: 72, 
	     			backgroundColor: CinzaClaro, 
	     			width: 'auto', 
	     			marginHorizontal: 30, 
	     			marginTop: 20,
	     			borderRadius: 10
	    	}}>
	     		<View style={{flex: 1, flexDirection: 'row'}}>
	     			<View style={{justifyContent: 'center', paddingLeft: 17}}>
	     				{
							item?.username?.photos?.map((ft, index) => {
								return ft.profile ? 
									<Image
						     			style={{height: 40, width: 40, borderRadius: 10}}
						     			source={{uri: ft.url}}
						     		/>
								: null
							})
						}
	     			</View>
	     			<View style={{flex:1, justifyContent: 'center'}}>
		     			<Text style={styles.txtNome}>
		     			 	{item.username.name}
		     			</Text>
	     			</View>
	     			<View style={{flex:1, justifyContent: 'center', alignItems:'flex-end', paddingRight: 20}}>
	     				<TouchableOpacity style={styles.container} onPress={() => props.press(item._id)}>
		     				<Text style={{color: 'red', fontFamily: Descricao, fontSize: 12, fontWeight: '700'}}>
		     				  	Remover
		     				</Text>
	     				</TouchableOpacity>
	     			</View>
	     		</View>
	     </View>
    	);
  	};

	return (
		<View style={{flex: 1}}>
			<FlatList
		      data={props.data}
		      renderItem={renderItem}
		      keyExtractor={(item) => item.uri}
		   />
		</View>
	)
}

const styles = StyleSheet.create({
	txtNome: {
		paddingLeft: 5, 
		color: 'white',
		fontSize: 14,
		fontWeight: '700',
		fontFamily: Descricao
	},
	container: {
		borderRadius: 20,
		borderWidth: 1,
		borderColor: 'red',
		height: 36,
		width: 77,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default Seguidores