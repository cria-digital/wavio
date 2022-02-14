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
import io from 'socket.io-client';


import {HelpersChat, HelpersUser} from '../../../Helpers';
const helpersChat = new HelpersChat();

const Eventos = (props) => {
   const [chats, setChats] = useState([]);

   const token = props.token

   useEffect(() => {
      helpersChat.GetChats().then(response => setChats(response.data?.filter(chat => chat.event)));
   }, [props.foco]);

   const api_url = "https://wavio-api-2bd7wtnamq-uc.a.run.app";

   const socket = React.useMemo(
      () =>
         io(api_url, {
            transports: ["websocket"],
            query: {
               token,
            },
         }),
      []
   );

   useEffect(() => {

      socket.on("error", (error) => console.log("socket error", error));

      socket.on("disconnect", (error) =>
         console.log("socket disconnected", error)
      );

      // escuta o evento para receber mensagems
      socket.on("chat_update", handleNewMessage);

      return () => {
         socket.off("error");

         socket.off("disconnect");

         socket.off("chat_update");
      };
   }, [socket]);

   function handleNewMessage(message) {
      console.log('socket' + message)
      helpersChat.GetChats().then(response => setChats(response.data?.filter(chat => chat.event)));  

      {/*var result = chats.find(fruit => fruit._id === message.chat);
      var pos = chats.indexOf(result);
      chats.splice(pos, 1, { ...result, unread_messages: message.unread_messages });
      console.log(result)
      setChats(chats) */}
   }

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
                  {  
                     item.unread_messages ? 
                     <View style={{ backgroundColor: '#8AF470', width: 30,justifyContent: 'center',alignItems: 'center',marginTop: 8, borderRadius: 10 }}>
                        <Text style={{color: '#000'}}>{item.unread_messages}</Text>
                     </View> : null
                  }
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
