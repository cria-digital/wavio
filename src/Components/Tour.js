import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { BackgroundClaro, Titulo, Descricao, Primary, Background } from '../Styles';
import Icon from 'react-native-vector-icons/Ionicons';

const meio = (Dimensions.get('window').width / 2) - 25
const fullHeight = Dimensions.get('window').height;
const height = fullHeight / 3

const Tour = (props) => {
	const [step, setStep] = useState('StepOne')

	switch (step) {
		case 'StepOne':
         return <StepOne />
      break;
      case 'StepTwo':
         return <StepTwo />
      break;
      case 'ThreeStep':
         return <ThreeStep />
      break;
      case 'FourStep':
         return <FourStep />
      break;
      default: return <StepTwo />
   }

   function StepOne(){
   	return (
			<View style={styles.centeredView}>
			   <View style={[styles.modalView, {justifyContent: "center"}]}>
			      <View style={{flexDirection: 'row', height: 317}}>
			         <View style={{flex: 1}}>
			          	<TouchableOpacity 
			          		style={{backgroundColor: '#FF5757', flex: 1, justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 170, borderBottomRightRadius: 170, opacity: 0.5}}
			          		onPress={() => setStep('StepTwo')}
			          	>
			          		<Icon name="return-up-back-outline" size={100} color={'white'} />
			          	</TouchableOpacity>
			         </View>
			         <View style={{flex: 1, marginLeft: 20, justifyContent: 'center'}}>
			          	<Text style={{color: 'white', fontFamily: Titulo, fontSize: 20}}>
			          		Deslize para a esquerda
			          	</Text>
			          	<Text style={{color: 'white', fontFamily: Descricao, fontSize: 16, fontWeight: '500'}}>
			          		para recusar Hangout com a pessoa
			          	</Text>
			         </View>
			      </View>
			   </View>
			</View>
		)
   }

   function StepTwo(){
   	return (
			<View style={styles.centeredView}>
			   <View style={[styles.modalView, {justifyContent: "center"}]}>
			      <View style={{flexDirection: 'row', height: 317}}>
			         <View style={{flex: 1, marginLeft: 20, justifyContent: 'center',}}>
			          	<Text style={{color: 'white', fontFamily: Titulo, fontSize: 20}}>
			          			  	Deslize para a direita
			          	</Text>
			          	<Text style={{color: 'white', fontFamily: Descricao, fontSize: 16, fontWeight: '500'}}>
			          			  	para aceitar Hangout com a pessoa
			          	</Text>
			         </View>
			         <View style={{flex: 1}}>
			          	<TouchableOpacity 
			          		style={{backgroundColor: '#8AF470', flex: 1, justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 170, borderBottomLeftRadius: 170, opacity: 0.5}}
			          		onPress={() => setStep('ThreeStep')}
			          	>
			          		<Icon name="return-up-forward-outline" size={100} color={'white'} />
			          	</TouchableOpacity>
			         </View>
			      </View>
			   </View>
			</View>
		)
   }

   function ThreeStep(){
   	return (
			<View style={styles.centeredView}>
			   <View style={styles.modalView}>
			   	<View style={{height: height}}>
			   	</View>
			      <View style={{ height: height}}>
				      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', justifyContent: 'flex-end'}}>
				      	<Text style={{color: 'white', fontFamily: Titulo, fontSize: 20}}>
			          		Se arrependeu da sua decisão ?
			          	</Text>
			          	<Text style={{color: 'white', fontFamily: Descricao, fontSize: 16, fontWeight: '500'}}>
			          		clique no botão para voltar 
			          	</Text>
				      </View>
			      	<View style={{flex: 1, justifyContent: 'flex-end'}}>
			      		<TouchableOpacity 
			      			style={{height: 58, width: 58, backgroundColor: Primary, borderRadius: 10, position: 'absolute', left: meio, elevation: 5, justifyContent: 'center', alignItems: 'center'}}
			      			onPress={() => setStep('FourStep')}
			      		>
                  		<Icon name="refresh-outline" size={30} color={'white'} />
               		</TouchableOpacity>
			      	</View>
			      </View>
			   </View>
			</View>
		)
   }

   function FourStep(){
   	return (
			<View style={styles.centeredView}>
			   <View style={styles.modalView}>
			   	
			      <View style={{height: height*2}}>
				      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', justifyContent: 'flex-end'}}>
				      	<Text style={{color: 'white', fontFamily: Titulo, fontSize: 20}}>
			          		Clique duas vezes 
			          	</Text>
			          	<Text style={{color: 'white', fontFamily: Descricao, fontSize: 16, fontWeight: '500'}}>
			          		para ver a proxima foto de usuário
			          	</Text>
				      </View>
			      	<View style={{flex: 1, justifyContent: 'center'}}>
			      		<TouchableOpacity 
			      			style={{height: 58, width: 58, backgroundColor: Primary, borderRadius: 10, position: 'absolute', left: meio, elevation: 5, justifyContent: 'center', alignItems: 'center'}}
			      			onPress={() => props.closeModal()}
			      		>
                  		<Icon name="hand-right-outline" size={30} color={'white'} />
               		</TouchableOpacity>
			      	</View>
			      </View>
			   </View>
			</View>
		)
   }
}

const styles = StyleSheet.create({
	centeredView: {
    	flex: 1
  	},
  	modalView: {
  		flex: 1,
    	backgroundColor: 'rgba(0,0,0, 0.6)',
    	shadowColor: "#000",
    	shadowOffset: {
      	width: 0,
      	height: 2
    	},
    	shadowOpacity: 0.25,
    	shadowRadius: 4,
    	elevation: 5,
  	},
});

export default Tour