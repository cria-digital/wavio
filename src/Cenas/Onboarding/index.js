import React, { useRef, useState, useEffect } from 'react'
import { Dimensions, ScrollView, TouchableOpacity, View, StyleSheet, Image, Text, ImageBackground, FlatList, NativeModules } from 'react-native'
import { Titulo, Descricao } from "../../Styles";
import Icon from 'react-native-vector-icons/Ionicons';
import  NextButton   from "../../Components/Buttons/NextButton"

const { width, height } = Dimensions.get('window');

import { translate } from '../../Locales'
const t = translate

const index = ({navigation}) => {
   let [cont, setCont] = useState(width)
   
   const mudarCena = () => {
      if(cont === 3*width){
         navigation.navigate('Login')
      }else{
          flatlistRef.scrollTo({x: cont}) 
      }
   }

   const handleScroll = (event) => {
      const positionX = event.nativeEvent.contentOffset.x;
      setCont(positionX + width)
   };
   
   return (
      <View>
         <ScrollView 
            ref={(scrollView) => { flatlistRef = scrollView; }}
            horizontal={true}
            pagingEnabled={true} 
            onScroll={(event) => handleScroll(event)}
            scrollEventThrottle={16}
         >
            <ImageBackground 
               source={require("../../Images/Onboarding/bg-onboarding-1.jpg")} 
               style={{height, width}} 
            >
               <View style={{position: 'absolute', top: '60%',  marginHorizontal: 25}}>
                  <Text style={styles.descricao}>{t("Explore todas as belezas da cidade")}</Text>
                  {/*<Image 
                     source={require("../../Images/SliderIndicator/Slider-Indicator-1.png")}
                     resizeMode="cover"
                  />*/}
               </View>
            </ImageBackground>
            <ImageBackground 
               source={require("../../Images/Onboarding/bg-onboarding-2.png")} 
               style={{height, width}} 
            >
               <View style={{position: 'absolute', top: '60%',  marginHorizontal: 25}}>
                  <Text style={styles.descricao}>{t('Descubra outras formas de conhecer')}</Text>
                  {/*<Image 
                     source={require("../../Images/SliderIndicator/Slider-Indicator-1.png")}
                     resizeMode="cover"
                  />*/}
               </View>
            </ImageBackground>
            <ImageBackground 
               source={require("../../Images/Onboarding/bg-onboarding-3.png")} 
               style={{height, width}} 
            >
               <View style={{position: 'absolute', top: '60%',  marginHorizontal: 25}}>
                  <Text style={styles.descricao}>{t('Sinta-se como um local Viva a cidade')}</Text>
                  {/*<Image 
                     source={require("../../Images/SliderIndicator/Slider-Indicator-1.png")}
                     resizeMode="cover"
                  />*/}
               </View>
            </ImageBackground>
         </ScrollView>
         <TouchableOpacity 
            style={{position: 'absolute', top: '7%', right: '5%'}}
            onPress={() => navigation.navigate('Login')}
         >
            <Icon name="close-circle-outline" size={30} color="white" />
         </TouchableOpacity>
         <View style={{position: 'absolute', top: '90%', left:'5%', flexDirection: 'row', alignItems:"center"}}>
            <Icon name="location" size={15} color="white" />
            <Text style={styles.localizacao}>Tokyo, Japan.</Text>
         </View>
         <View style={{position: 'absolute', top: '85%', right:'5%',}}>
            <NextButton callback={() => mudarCena()}/>
         </View>
     </View>
   );
}

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

export default index