import React, { useState, useEffect } from 'react'
import { ScrollView, Text, FlatList, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Descricao, Primary } from '../Styles'
import moment from "moment";

const Calendar = () => {
	const [dias, setDias] = useState([]);
	const [selected, setSelected] = useState()
	const [dia, setDia] = useState(new Date().getDate()-1)

	useEffect(() => {
		var today = new Date();
		var mm = today.getMonth() + 1
		var yyyy = today.getFullYear();
		getDiasMes(mm, yyyy);
		setSelected(today.getDate())
	}, [])

	function getDiasMes(month, year) {
     	month--;

     	var date = new Date(year, month, 1);
     	var days = [];
     	while (date.getMonth() === month) {
        	days.push(date.getDate());
        	date.setDate(date.getDate() + 1);
     	}
     	setDias(days)
	}

	const renderItem = ({ item }) => {
		var today = new Date();
		var mm = today.getMonth() + 1
		return(
			<TouchableOpacity 
				style={[styles.container, {backgroundColor: selected == item ? 'white' : null}]} 
				onPress={() => setSelected(item)}
			>
				<Text style={[styles.mes, {color: selected == item ? 'black' : 'white'}]}>
					{moment().format('MMM')}
				</Text>
				<Text style={[styles.dia, {color: selected == item ? 'black' : 'white'}]}>
					{item}
				</Text>
			</TouchableOpacity>
		)
	}

	const getItemLayout = (data, index) => (
    	{ length: 60, offset: 60 * index, index }
  	)

	return (
		<View>
			<View style={{height: 1, backgroundColor: Primary, marginLeft: 10}} />
			<View style={{height: 56, backgroundColor: '#3F3F3F'}}>
				<FlatList
					data={dias}
					renderItem={renderItem}
					horizontal={true}
					getItemLayout={getItemLayout}
					initialScrollIndex={dia}
					showsHorizontalScrollIndicator={false}
					keyExtractor={(item) => item}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: { 
		justifyContent: 'center', 
		alignItems: 'center', 
		borderRadius: 10,
		marginHorizontal: 10,
		marginVertical: 10,
		height: 40,
		width: 40
	},
	mes: {
		fontFamily: Descricao,
		fontWeight: '400',
		fontSize: 14
	},
	dia: {
		color: 'white',
		fontFamily: Descricao,
		fontWeight: '700',
		fontSize: 14
	}
})

export default Calendar