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

import {HelpersChat, HelpersUser} from '../../../Helpers';
const helpersChat = new HelpersChat();
//const helpersUser = new HelpersUser();

const Conversas = props => {
   const [chats, setChats] = useState([]);

   useEffect(() => {
    console.log("teste")
      helpersChat.GetChats().then(response => setChats(response.data?.filter(chat => !chat.event)));
   }, [props.foco]);

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
            {/*  
               item.unread_messages ? 
               <View style={{backgroundColor: '#8AF470', width: 30, justifyContent: 'center', alignItems: 'center',  borderRadius: 10}}>
   			    	<Text style={{color: '#000'}}>
   			    		2
   			    	</Text>
			      </View> : null
            */}
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
