import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { CinzaClaro, Descricao, Placeholder } from '../../../Styles'

const Data = [
	{
		uri: require('../../../Images/UI/Rectangle333.png'),
		nome: 'Luis Sobreira',
		data: '27/12/21',
		referencia:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu mi ut neque blandit tincidunt nec id ex. Phasellus in erat pharetra, congue nulla eu, condimentum lorem.' 
	}
]

const Referencias = () => {

	const renderItem = ({ item }) => {
    	return (
	     	<View 
	     		style={{
	     			height: 154, 
	     			backgroundColor: CinzaClaro, 
	     			width: 'auto', 
	     			marginHorizontal: 30, 
	     			marginTop: 20,
	     			borderRadius: 10
	    	}}>
	     		<View style={{flex: 1, flexDirection: 'row'}}>
	     			<View style={{justifyContent: 'center', paddingLeft: 17}}>
	     				<Image
	     				  	style={{height: 40, width: 40}}
	     				  	source={item.uri}
	     				/>
	     			</View>
	     			<View style={{flex:1}}>
		     			<Text style={styles.txtData}>
		     			  {item.data}
		     			</Text>
		     			<Text style={styles.txtNome}>
		     			 	{item.nome}
		     			</Text>
	     			</View>
	     		</View>
	     		<View style={{flex: 1, marginHorizontal: 10}}>
	     			<Text style={styles.txtReferencia}>
	     			  {item.referencia}
	     			</Text>
	     		</View>
	     </View>
    	);
  	};

	return (
		<View style={{flex: 1}}>
			<FlatList
		      data={Data}
		      renderItem={renderItem}
		      keyExtractor={(item) => item.uri}
		   />
		</View>
	)
}

const styles = StyleSheet.create({
	txtData:{ 
		textAlign: 'right', 
		paddingRight: 17, 
		paddingTop: 17,
		color: '#8B8B8B',
		fontSize: 10,
		fontWeight: '500',
		fontFamily: Descricao
	},
	txtNome: {
		paddingLeft: 5, 
		color: 'white',
		fontSize: 14,
		fontWeight: '700',
		fontFamily: Descricao
	},
	txtReferencia: {
		fontSize: 12,
		fontWeight: '400',
		fontFamily: Descricao,
		color: '#FFFFFF',
		textAlign: 'center'
	}
})

export default Referencias