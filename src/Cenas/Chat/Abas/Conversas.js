import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {Descricao, Background} from '../../../Styles';
import io from 'socket.io-client';

import {HelpersChat, HelpersUser} from '../../../Helpers';
const helpersChat = new HelpersChat();
//const helpersUser = new HelpersUser();

const Conversas = props => {
   const [chats, setChats] = useState([]);

   const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NDQ2MTA3NzAsIl9pZCI6IjYxNjNiYzA3YzA4NjViZDI0NmFjOWJmMCIsImlkIjoiNjE2M2JjMDdjMDg2NWJkMjQ2YWM5YmYwIiwibmFtZSI6ImhlcnZlc3NvbiAgcG9ydG8iLCJlbWFpbCI6ImhlcnZlc3NvbnBvcnRvQGhvdG1haWwuY29tIiwiaWF0IjoxNjQ0NTI0MzcwfQ.oZkMkpVONKolAKNwTe-maDzYRhxQ_WqGVyDSwe_y3P4"

   useEffect(() => {
      helpersChat.GetChats().then(response => setChats(response.data?.filter(chat => !chat.event)));
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
      const result = chats.find(fruit => fruit._id === message.chat );
      var pos = chats.indexOf(result);
      chats.splice(pos, 1, { ...result, unread_messages: message.unread_messages });
      setChats(chats.map(item => item))
   }

   const renderAvatar = photos => {
    return photos.map((item, index) => {
      return item.profile ? (
        <Image
          style={{height: 40, width: 40, borderRadius: 5}}
          source={{uri: item.url || item.uri}}
          key={index}
          resizeMode="cover"
        />
      ) : null;
    });
   };

  const renderItem = ({item}) => {
  	const arr = item.members.find(ids => ids._id !== props.user._id)

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => props.chat(item)}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1}}>{renderAvatar(arr.photos)}</View>
          <View style={{flex: 3}}>
            <Text
              style={{
                color: 'white',
                fontFamily: Descricao,
                fontWeight: '700',
                fontSize: 14,
              }}>
              {arr.name}
            </Text>
            <Text
              style={{
                color: 'white',
                fontFamily: Descricao,
                fontWeight: '400',
                fontSize: 14,
              }}>
              {item?.last_message?.content}
            </Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Text style={{color: 'white'}}>{item.date}</Text>
            {
               item.unread_messages ? 
               <View style={{backgroundColor: '#8AF470', width: 30, justifyContent: 'center', alignItems: 'center',  borderRadius: 10}}>
   			    	<Text style={{color: '#000'}}>
   			    		{item.unread_messages}
   			    	</Text>
			      </View> : null
            }
          </View>
        </View>
        <View style={{borderWidth: 1, borderColor: 'gray', marginLeft: 60}} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{marginTop: 20}}>
      <FlatList
        data={chats}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        ListFooterComponent={() => (
          <View style={{height: 300, backgroundColor: Background}} />
        )}
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

export default Conversas;
