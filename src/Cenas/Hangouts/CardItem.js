import React, {useState} from 'react';

import { Text, View, Image, Dimensions, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BlurView, VibrancyView } from "@react-native-community/blur";
import { BackgroundClaro, Titulo, Descricao, Primary, Background } from '../../Styles';

const meio = (Dimensions.get('window').width / 2) - 25

const CardItem = ({
  image,
  imagens,
  onPressLeft,
  onPressRight,
  proxima,
  previa,
  voltar
}) => {
   
   const [cont, setCont] = useState(0)
  
   const fullWidth = Dimensions.get('window').width;
   const fullHeight = Dimensions.get('window').height;
   const height = fullHeight / 3

   const imageStyle = [
      {
         width: fullWidth,
         height: height*2
      }
   ];

   const next = () => {
      if(cont+1 < imagens?.length){
         setCont(cont + 1);
      }
   }

   const prev = () => {
      if(cont > 0){
         setCont(cont - 1)
      }
   }


   return (
      <View style={styles.containerCardItem}>
         <ImageBackground source={{uri: imagens.length > 0 ? imagens[cont]?.url : null}} style={imageStyle} resizeMode='cover'>
            <View style={{justifyContent: 'space-between', flexDirection: 'row', paddingTop: 30, paddingHorizontal: 30}}>
               <TouchableOpacity style={styles.button} onPress={() => voltar()}>
                  <Icon name="arrow-back" size={23} color={"white"} />
               </TouchableOpacity>
               {
                  Platform.select({
                     ios: <BlurView
                           style={{margin: 20, width: 75, height:44, justifyContent:'center', alignItems: 'center', borderRadius: 20}}
                           blurType="light"
                           blurAmount={0.1}
                           reducedTransparencyFallbackColor="white"
                     >
                        <View style={{flexDirection: 'row'}}>
                           <Icon name="image-outline" size={20} color={'white'} />
                           <Text  style={{fontFamily: Titulo, color: 'white', fontSize: 16, fontWeight: '700', marginHorizontal: 5}}>
                              {cont+1}/{imagens?.length}
                           </Text>
                        </View>
                     </BlurView>,
                     android: <View style={[styles.styleViewBlur, {height: 44, width: 75, margin: 10 }]}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', flex:1, alignItems: 'center'}}>
                           <Icon name="image-outline" size={20} color={'white'} />
                           <Text  style={{fontFamily: Titulo, color: 'white', fontSize: 14, fontWeight: '700'}}>
                              {cont+1}/{imagens?.length}
                           </Text>
                        </View>
                     </View>
                  })
               }
            </View>
            <View style={{ flex: 1, flexDirection: 'row'}}>
               <TouchableOpacity style={{flex: 4}} onPress={() => prev()} />
                  
               <TouchableOpacity style={{flex: 1}} />
                  
               <TouchableOpacity style={{flex: 4}} onPress={() => next()} />
            </View>
            <View style={{flexDirection: 'row', width: '100%', alignItems: 'flex-end' }}>
               <TouchableOpacity 
                  style={{paddingRight: 10, backgroundColor: 'rgba(255, 87, 87, 0.25)', height: 55, flex: 1, justifyContent: 'center', alignItems: 'center'}}
                  onPress={() => onPressLeft()}
               >
                  <Icon name="close-outline" size={30} color={'white'} />
               </TouchableOpacity>
               <View style={{height: 58, width: 58, backgroundColor: Primary, borderRadius: 10, position: 'absolute', left: meio, elevation: 5, justifyContent: 'center', alignItems: 'center'}}>
                  <Icon name="refresh-outline" size={30} color={'white'} />
               </View>
               <TouchableOpacity 
                  style={{backgroundColor: 'rgba(24, 178, 76, 0.25)', height: 55, flex: 1, justifyContent: 'center', alignItems: 'center'}}
                  onPress={() => onPressRight()}
               >
                  <Icon name="checkmark-outline" size={30} color={'white'} />
               </TouchableOpacity>
            </View>
         </ImageBackground>
      </View>
   );
};

const styles = StyleSheet.create({
   containerCardItem: {
      backgroundColor: '#2D2D2D40',
      borderRadius: 8,
      alignItems: "center",
      shadowOpacity: 0.05,
      shadowRadius: 10,
      shadowColor: 'black',
      shadowOffset: { height: 0, width: 0 }
   },
   styleViewBlur: {
      borderRadius: 10,
      shadowOpacity: 1,
      shadowColor: '#000',
      shadowOffset: { width: 10, height: 10 },
      shadowRadius: 5,
      //elevation: 5,
      backgroundColor: "rgba(255, 255, 255, 0.3)"
   },
   button: {
      width: 58,
      height: 52,
      borderRadius:20,
      justifyContent:"center",
      alignItems:"center",
      backgroundColor: Primary,
      shadowOpacity: 1,
      shadowColor: '#000',
      shadowOffset: { width: 10, height: 10 },
      shadowRadius: 5,
      //elevation: 5,
   }
})

export default CardItem;
