import React from 'react'
import { View, Text, ImageBackground, StyleSheet, Image, SafeAreaView, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-paper';
import { Background, CinzaEscuro, placeholder } from "../../Styles"
import Icon from 'react-native-vector-icons/Ionicons';
import { Titulo, Descricao } from "../../Styles"
import  NextButton   from "../../Components/Buttons/NextButton"

const Onbording1 = ({ navigation }) => {

   const callbackFuncao = () => {
      navigation.navigate('Login')
   }

   return(
      <SafeAreaView style={styles.container}>
         <ImageBackground 
            source={require("../../Images/Onboarding/bg-onboarding-3.png")} 
            resizeMode="cover" 
            style={styles.image}
         >
            <TouchableOpacity 
               style={[styles.container, {alignItems: 'flex-end', paddingTop: 28,paddingRight: 28}]}
               onPress={() => navigation.navigate('Login')}
            >
               <Icon name="close-circle-outline" size={30} color="white" />
            </TouchableOpacity>
            <View style={[styles.container, {marginHorizontal: 25, justifyContent: "space-around"}]}>
               <Text style={styles.descricao}>Explore cada beleza da cidade.</Text>
               <Image 
                  source={require("../../Images/SliderIndicator/Slider-Indicator-3.png")}
                  resizeMode="cover"
               />
               <View style={styles.containerInferior}>
                  <View style={{flexDirection: 'row', alignItems:"center"}}>
                     <Icon name="location" size={15} color="white" />
                     <Text style={styles.localizacao}>Tokyo, Japan.</Text>
                  </View>
                  <NextButton callback={callbackFuncao}/>
               </View>
            </View>
         </ImageBackground>
      </SafeAreaView>
   )
};

const styles = StyleSheet.create({
  	container: {
    	flex: 1,
  	},
  	image: {
    	flex: 1,
    	justifyContent: "center"
  	},
   descricao: {
      fontFamily: Titulo,
      fontSize: 38,
      color: "white"
   },
   containerInferior: {
      flexDirection: 'row', 
      justifyContent:'space-between', 
      alignItems: 'flex-end'
   },
   localizacao: {
      fontFamily: Descricao,
      color: "white",
      fontSize: 10
   }
});

export default Onbording1