import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {Descricao} from '../../../Styles';


import {HelpersChat, HelpersUser} from '../../../Helpers';
const helpersChat = new HelpersChat();

const Eventos = (props) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    helpersChat
      .GetChats()
      .then(response => setChats(response.data?.filter(chat => chat.event)));
  }, [props.foco]);

   const renderItem = ({item}) => {
      let image = item?.event?.photos?.find(photo => photo.banner);
      if (!image) image = item?.event?.photos[0];

      return (
         <TouchableOpacity style={styles.container} onPress={() => props.press(item.event)}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
               <View style={{flex: 1}}>
                  <Image
                     style={{height: 40, width: 40, borderRadius: 5}}
                     resizeMode="cover"
                     source={{uri: image.url}}
                  />
               </View>
               <View style={{flex: 3}}>
                  <Text style={{ color: 'white', fontFamily: Descricao, fontWeight: '700', fontSize: 14 }}>
                     {item.event?.title}
                  </Text>
                  <Text  style={{color: 'white', fontFamily: Descricao, fontWeight: '400', fontSize: 14,}}>
                    {item?.last_message?.content}
                  </Text>
               </View>
               <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <Text style={{color: 'white'}}>{item.date}</Text>
                  {/*  
                     item.unread_messages ? 
                     <View style={{ backgroundColor: '#8AF470', width: 30,justifyContent: 'center',alignItems: 'center',marginTop: 8, borderRadius: 10 }}>
                        <Text style={{color: '#000'}}>{item.unread_messages}</Text>
                     </View> : null
                  */}
               </View>
            </View>
            <View style={{borderWidth: 1, borderColor: 'gray', marginLeft: 60}}></View>
         </TouchableOpacity>
      );
   };

  return (
    <View style={{marginTop: 20}}>
      <FlatList
        data={chats}
        renderItem={renderItem}
        keyExtractor={item => item.uri}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 27,
    height: 70,
    justifyContent: 'space-around',
  },
});

export default Eventos;
