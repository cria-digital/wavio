import React, { useState, useRef, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

const OtpInputCode = (props) => {
	const [inputOne, setInputOne] = useState('')
	const [inputTwo, setInputTwo] = useState('')
	const [inputThree, setInputThree] = useState('')
	const [inputFour, setInputFour] = useState('')

	const pin1 = useRef()
	const pin2 = useRef()
	const pin3 = useRef()
	const pin4 = useRef()


	useEffect(() => {
		pin1.current.focus();
	}, [])

	return (
		<View style={{flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20}}>
			<TextInput
				ref={pin1}
				style={styles.input}
				value={inputOne}
				onChangeText={(inputOne) => {
					setInputOne(inputOne)
					if(inputOne != ''){
						props.code(inputOne+inputTwo+inputThree+inputFour ),
						pin2.current.focus();
					}
				}}
				maxLength={1}
				keyboardType='number-pad'
			/>
			<TextInput
				ref={pin2}
				style={styles.input}
				value={inputTwo}
				onChangeText={(inputTwo) => {
					setInputTwo(inputTwo)
					if(inputTwo != ''){
						props.code(inputOne+inputTwo+inputThree+inputFour),
						pin3.current.focus();
					}
				}}
				maxLength={1}
				keyboardType='number-pad'
			/>
			<TextInput
				ref={pin3}
				style={styles.input}
				value={inputThree}
				onChangeText={(inputThree) => {
					setInputThree(inputThree)
					if(inputThree != ''){
						props.code(inputOne+inputTwo+inputThree+inputFour ),
						pin4.current.focus();
					}
				}}
				maxLength={1}
				keyboardType='number-pad'
			/>
			<TextInput
				ref={pin4}
				style={styles.input}
				value={inputFour}
				onChangeText={(inputFour) => {
					props.code(inputOne+inputTwo+inputThree+inputFour ),
					setInputFour(inputFour)}
				}
				maxLength={1}
				keyboardType='number-pad'
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	input: {
		width: 50,
		height: 60,
		borderWidth: 1, 
		borderColor: 'white',
		borderRadius: 5,
		color: 'white',
		textAlign: 'center',
		fontFamily: 'Boston Bold',
		fontSize: 20,
		fontWeight: 'bold'
	}
})

export default OtpInputCode