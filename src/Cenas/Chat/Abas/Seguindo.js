import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native'
import { AlphabetList } from "react-native-section-alphabet-list";
import { Descricao } from '../../../Styles'


import {HelpersFollowers} from '../../../Helpers';
const helpersFollowers = new HelpersFollowers();

const Seguindo = (props) => {
	const [seguindo, setSeguindo] = useState([])

	useEffect(() => {
		helpersFollowers.GetFollowing(props.user._id).then(response => setSeguindo(response.data));
	}, [props.foco])

	const renderItem = ({ item }) => {
		let image = item?.target?.photos?.find(photo => photo.profile);
      if (!image) image = item?.target?.photos[0];

		return(
			<TouchableOpacity style={styles.container} onPress={() => props.press(item.target._id)}>
			   <View style={{flexDirection: 'row'}}>
				   <Image
				    	style={{height: 40, width: 40, borderRadius: 5}}
				    	resizeMode='cover'
				    	source={{uri: image.url}}
				   />
				   <View style={{paddingLeft: 10}}>
				    	<Text style={{color: 'white', fontFamily: Descricao, fontWeight: '700', fontSize: 14}}>
				    		{item.target.name}
				    	</Text>
				   </View>
			   </View>
	    	</TouchableOpacity>
		)
	}

	return (
		<View style={{marginTop: 15}}>
    		<FlatList
		      data={seguindo}
		      renderItem={renderItem}
		      keyExtractor={(item) => item.id}
		   />
		</View>
  	)
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 27,
		height: 50, 
		justifyContent: 'space-around'
	}
})

export default Seguindo