import React, { useState, useEffect, useRef, useCallback } from 'react'
import { View, Text, Image, StyleSheet, FlatList, ImageBackground, TextInput, SafeAreaView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient'
import { Background, Primary, Descricao } from '../../Styles'
import { useRoute } from '@react-navigation/native';
import axios from "axios";
import io from 'socket.io-client';
import moment from 'moment';

import { HelpersChat, HelpersUser } from "../../Helpers";
const helpersChat = new HelpersChat();
const helpersUser = new HelpersUser();

const Conversa = ({navigation}) => {
	//const [txt, setText] = useState('');
	//const [mensagens, setMensagens] = useState([]);
	//const chat_id = "61aa9fec15942ee1cc14cd15";
  	const [message, setMessage] = useState("");
  	const [messages, setMessages] = useState([]);
  	const [refresh, setRefresh] = useState(false);
  	
	const [user, setUser] = useState([])

	const route = useRoute();

	const yourRef = useRef(null);

	const data = route.params.item
	const userId = route.params.user_id
	const token = route.params.token

	const item = JSON.parse(data)

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
    	loadChatMessages();

    	socket.on("error", (error) => console.log("socket error", error));

    	socket.on("disconnect", (error) =>
      	console.log("socket disconnected", error)
    	);

    	// escuta o evento para receber mensagems
    	socket.on("new_message", handleOnMessage);

    	return () => {
      	socket.off("error");

      	socket.off("disconnect");

      	socket.off("new_message");
    	};
  	}, [socket]);

  	const buscarperfil = () => {
		helpersUser.GetUserDinamic(send_id).then(response => {
			setUser(response);
		})
	}

	function loadChatMessages() {
      helpersChat.GetMessageChat(item._id).then(response => {
			setMessages(response.data)
			//const finduser =  response.data.find(function(item){ return item.author !== userId })
			//setUser(finduser.author)
		})
  	}

  	function handleSendMessage(){
    	const _message = String(message.trim());

    	setMessage("");

    	socket.emit("send_message", {
      	content: _message,
      	author: userId, // ID do usuario logado
      	chat: item._id, // ID do chat para onde a mensagem vai ser enviada
    	});
  	}

  	function handleOnMessage(message) {
  		const	msg={
  			author: {
  				_id: message.author
  			},
  			content: message.content,
  			_id: message._id
  		}
  		console.log(message)
  		setMessages((prev) => [...prev, msg]);
  	}

	const renderAvatar = () => {
		return user?.photos?.map((item,index) => {
			return item.profile ? 
				<Image
					style={{height: 40, width: 40, marginLeft: 10}}
					source={{uri: item.uri || item.url}}
					key={index}
					resizeMode='cover'
				/>
			: null
		})
	}

	const renderItem = ({ item }) => {
		return (
		   <View style={{paddingTop: 20}}>
			{
				item.author._id == userId ?
					<View style={{alignSelf: 'flex-end'}}>
						<View style={styles.myMsg}>
							<Text style={{color: 'black', fontSize: 12, fontFamily: Descricao, fontWeight: '500'}}>
								{item.content}
							</Text>
						</View>
						<Text style={{marginTop: 5,  marginTop: 5, color: 'white', fontSize: 12, fontFamily: Descricao, fontWeight: '400'}}>
							{moment(item.createdAt).format('hh:mm')}
						</Text>
					</View>
				:
					<View style={{alignSelf: 'flex-start'}}> 	
						<View style={styles.youMsg}>
								<Text style={{color: 'black', fontSize: 12, fontFamily: Descricao, fontWeight: '500'}}>
									{item.content}
							</Text>
						</View>
						<Text style={{alignSelf: 'flex-end', marginTop: 5, color: 'white', fontSize: 12, fontFamily: Descricao, fontWeight: '400'}}>
							{moment(item.createdAt).format('hh:mm')}
						</Text>
					   </View> 
			} 
		   </View> 
		);
	};

	const getItemLayout = (data, index) => (
    	{ length: 35, offset: 35 * index, index }
  	)

	const arr = item.members.find(ids => ids._id !== userId)
	let image = arr?.photos?.find(photo => photo.banner);
   if (!image) image = arr?.photos[0];

	return (
		<SafeAreaView style={{backgroundColor: Background}}>
			<ImageBackground 
			   source={require('../../Images/UI/Rectangle228.png')} 
			  	resizeMode="cover"
			  	style={{width: '100%', height: '100%'}}
		   >
				<View style={styles.header}>
					<Icon name="arrow-back-outline" size={23} color={Primary} onPress={() => navigation.goBack()}/>
					<Image
						style={{height: 40, width: 40, marginLeft: 10, borderRadius: 5}}
						source={{uri: image ? image.url : null }}
						resizeMode='cover'
					/>
					<View style={{paddingLeft: 17}}>
						<Text style={{fontFamily: Descricao, fontWeight: '700', fontSize: 14, color: 'white'}}>
							{arr.name}
						</Text>
						<Text style={{fontFamily: Descricao, fontWeight: '400', fontSize: 14, color: 'white'}}>
						   {
							//Online
						   }
						</Text>
					</View>
				</View>
				<FlatList
				  	data={messages}
				  	renderItem={renderItem}
				  	keyExtractor={(item) => item._id}
				  	extraData={refresh}
				  	ref={yourRef}
				  	onContentSizeChange={() => yourRef.current.scrollToEnd({animated:true}) }
				  	onLayout={() => yourRef.current.scrollToEnd()}
			   />
			   <View style={{flexDirection: 'row', height: 82, backgroundColor: Background, alignItems: 'center', paddingHorizontal: 30}}>
					<TextInput
						onChangeText={(text) => setMessage(text)}
						value={message}
						placeholder='Pesquisar'
						placeholderTextColor='white'
						style={{backgroundColor: '#2D2D2D', height: 40, flex: 1, borderRadius: 20, paddingLeft:10, color: 'white'}}
					/>
					<TouchableOpacity onPress={() => message !== "" ? handleSendMessage() : null}>
						<LinearGradient 
							colors={['#eba358', '#df1884']} 
							style={{height: 40, width: 40, borderRadius: 20, marginLeft: 10, justifyContent: 'center', alignItems: 'center'}}
						>
							<Icon name="send-outline" size={18} color={'white'} />
						</LinearGradient>
					</TouchableOpacity>
			   </View>
			</ImageBackground>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	header: {
		height: 82, 
		backgroundColor: Background, 
		borderBottomRightRadius: 20, 
		borderBottomLeftRadius: 20,
		alignItems: 'center',
		paddingLeft: 17, 
		flexDirection: 'row'
	},
	myMsg: {
		backgroundColor: '#FFA1F6',
		padding: 10,
		marginRight: 20,
		borderBottomRightRadius: 10,
		borderBottomLeftRadius: 10,
		borderTopLeftRadius: 10,
		maxWidth:300,
		alignSelf: 'flex-end'
	},
	youMsg: {
		backgroundColor: '#BEFFF7',
		padding: 10,
		marginLeft: 20,
		borderBottomRightRadius: 10,
		borderBottomLeftRadius: 10,
		borderTopRightRadius: 10,
		maxWidth:300,
		alignSelf: 'flex-start'
	}
})

export default Conversa