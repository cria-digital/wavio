import React from 'react'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import { useRoute, useNavigation } from '@react-navigation/native';
import BackButonSolid from '../../Components/Buttons/BackButtonSolid'
import { Background } from "../../Styles"

const FullMap = () => {

	const route = useRoute();
	const navigation = useNavigation();

	const { cords } = route.params;

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: Background}}>
			<View style={{flex: 1}}>
				<MapView
					style={styles.mapRender}
					region={{
						latitude: cords.lat,
						longitude: cords.long,
						latitudeDelta: 0.0143,
						longitudeDelta: 0.0134,
					}}
					showsUserLocation
					followsUserLocation
					loadingEnabled
				>
					<Marker
					  	coordinate={{ latitude : cords.lat, longitude : cords.long}}
					/>
				</MapView>
				<View style={{position: 'absolute', top: 30, left: 30}}>
					<BackButonSolid callback={() => navigation.goBack()}/>
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	mapRender: {
  		height: '100%',
  		width: '100%',
  		borderRadius: 10,
  	}
})



export default FullMap