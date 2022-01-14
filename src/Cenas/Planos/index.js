import React from 'react'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import BackButtonSolid from '../../Components/Buttons/BackButtonSolid'
import { Background, Titulo, Primary, CinzaEscuro, Descricao, Placeholder } from '../../Styles'
import GoButton from "../../Components/Buttons/GoButton"
import Icon from 'react-native-vector-icons/Ionicons';

const index = ({navigation}) => {
	return (
		<SafeAreaView style={{flex: 1, backgroundColor: Background}}>
			<View style={{paddingLeft: 30, paddingTop: 30}}>
				<BackButtonSolid  callback={() => navigation.goBack()}/>
			</View>
			<Text style={{paddingLeft: 30, paddingTop: 20, color: "white", fontFamily: Titulo, fontSize: 28}}>
			  	Wavio Plus+
			</Text>
			<Text style={{paddingLeft: 30, paddingTop: 12, color: "white", fontFamily: Descricao, fontSize: 14, fontWeight: "700"}}>
			  	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vulputate posuere.
			</Text>
			<View style={{paddingHorizontal: 30, paddingTop: 12, height: 96, justifyContent: "space-between"}}>
				<Text style={styles.txtAtributes}>
			  	 -	Lorem ipsum dolor sit amet
				</Text>
				<Text style={styles.txtAtributes}>
			  		- Lorem ipsum dolor sit amet
				</Text>
				<Text style={styles.txtAtributes}>
			  		- Lorem ipsum dolor sit amet
				</Text>
				<Text style={styles.txtAtributes}>
			  		- Lorem ipsum dolor sit amet
				</Text>
			</View>
			<View style={{flex: 2.5, justifyContent: "flex-end", alignItems: 'center'}}>
				<View style={{height: 250, width: 279, backgroundColor: "#444", borderRadius: 20}}>
					<View style={{height: 48, backgroundColor: Primary,  borderTopLeftRadius: 20, borderTopRightRadius: 20, justifyContent: "center", alignItems: 'center'}}>
						<Text style={{color: 'white', fontFamily: Titulo, fontSize: 14}}>
						  Opcão mais vantajosa
						</Text>
					</View>
					<View style={{padding: 28}}>
						<Text style={{color: 'white', fontFamily: Titulo, fontSize: 24}}>
						  1 ano
						</Text>
						<View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
							<Text style={{color: Primary, fontFamily: Titulo, fontSize: 32}}>
						  		R$ 16,55 {" "} 
							</Text>
							<Text style={{color: 'white', fontFamily: Descricao, fontSize: 12}}>
						  		mensais
							</Text>
						</View>
						<Text style={{color: '#BBB', fontFamily: Descricao, fontSize: 12, fontWeight:"600"}}>
						  Total: 199,80
						</Text>
						<View style={{paddingTop: 24, flexDirection: 'row', alignItems: 'center'}}>
							<Icon name="wallet-outline" size={30} color={Primary} />
							<Text style={{paddingHorizontal: 10, color: 'white', fontFamily: Descricao, fontSize: 12, fontWeight: "700"}}>
							  	Economize
							</Text>
							<Text style={{color: 'white', fontFamily: Titulo, fontSize: 12, fontWeight: "700"}}>
							  	R$ 40,20
							</Text>
						</View>
					</View>
				</View>
			</View>
			<View style={{flex: 1, justifyContent: 'flex-end', alignItems: "flex-end"}}>
				<View style={{padding: 30}}>
					<GoButton width={200} title={"Selecionar plano"} press={() => loginHandle()}/>
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	txtAtributes: {
		color: "white", 
		fontFamily: Descricao, 
		fontSize: 14, 
		fontWeight: "600"
	}
})

export default index