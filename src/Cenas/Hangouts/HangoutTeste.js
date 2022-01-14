import React, {useState, useEffect, useRef} from 'react';

import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BackgroundClaro, Titulo, Descricao, Primary, Background } from '../../Styles';
import BackButtonSolid from '../../Components/Buttons/BackButtonSolid'
import NoMoreCards from '../../Components/NoMoreCards'
import { BlurView, VibrancyView } from "@react-native-community/blur";
import CardStack, { Card } from 'react-native-card-stack-swiper';
import CardItem from './CardItem';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { HelpersHangouts, HelpersInterests } from "../../Helpers";
const helpersHangouts = new HelpersHangouts();
const helpersInterests = new HelpersInterests();

import { connect } from 'react-redux';
import { toggle_tab } from '../../Redux/actions';

import { translate } from '../../Locales'
const t = translate

const fullHeight = Dimensions.get('window').height;
const height = fullHeight / 3

const index = props => {
	const [data, setData] = useState([])
	const [select, setSelect] = useState(0)
	const [cont, setCont] = useState(0)
	const [intereses, setInteresses] = useState([])
	const [selectInter, setSelectInter] = useState([])

	useEffect(() => {
		helpersHangouts.GetListHangout().then(response => {
			setData(response.data)
		})
	}, [])

	useEffect(() => {
		helpersInterests.GetInterests().then(response => setInteresses(response.data))
	}, [])

	const swiper = useRef();

   const renderInter = () => {
   	const teres = []
		intereses.forEach(item => data[select]?.interests.includes(item.id) ? teres.push(item) : null);
		return teres.map((item) => {
	      return(
   			<View>
		      	<TouchableOpacity style={{padding: 5, margin: 5, borderRadius: 10, borderColor: Primary, borderWidth: 1}}>
	      			<Text style={styles.interes}>
	      			 	{item.name}
	      			</Text>
      			</TouchableOpacity> 
		   	</View>
   		)
	   })
	}

	const swipe = (user, index, direcao) => {
		setSelect(index + 1);
		helpersHangouts.LikeOrDeslike(user.id, direcao).then(res => console.log(res.data))
		setCont(0);
	} 

	const swipeLeft = (user, index, direcao) => {
		setSelect(index + 1);
		helpersHangouts.LikeOrDeslike(user.id, direcao).then(res => console.log(res.data))
		setCont(0);
		swiper.current.swipeLeft()
	}

	const swipeRight = (user, index, direcao) => {
		setSelect(index + 1);
		shelpersHangouts.LikeOrDeslike(user.id, direcao).then(res => console.log(res.data))
		setCont(0);
		swiper.current.swipeRight()
	}

  	return (
    	<SafeAreaView style={styles.container}>
	    	<View style={{height: height*2}}>
	    	{
	    		data.length > 0 ? <CardStack
		         loop={false}
		         verticalSwipe={false}
		         renderNoMoreCards={() => <NoMoreCards voltar={() => props.toggle_tab()}/>}
		         ref={swiper}
		      >
		         {data.map((item, index) => (
		           	<Card 
		           		key={index} 
		           		onSwipedLeft={() => swipe(item, index, 'left')} 
		           		onSwipedRight={() => swipe(item, index, 'right')}
		           	>
		              	<CardItem
		                	image={item.photos[1]?.url ? item.photos[cont]?.url : null}
		                	imagens={item.photos}
		                	onPressLeft={() => swipeLeft(item, index, 'left')}
                			onPressRight={() => swipeRight(item, index, 'right')}
                			previa={() => prev()}
                			proxima={() => next()}
                			voltar={() => props.toggle_tab()}
		              	/>
	            	</Card>
		         ))}
		        
        		</CardStack> : null
	    	}	
	    	</View>
	      <View style={{height: height, backgroundColor: '#424343', borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
	      	<View style={{backgroundColor: '#2D2D2D40', margin: 20, flex: 1, borderRadius:20, padding: 10}}>
	      		<Text style={{fontFamily: Titulo, fontSize: 22, color: 'white', fontWeight: 'bold'}}>
	      		  	{data[select]?.name} 
	      		</Text>
	      		<Text style={{fontSize: 14, fontWeight: '500', marginTop: 10, color: 'white'}} numberOfLines={3}>
	      		  	{data[select]?.biography} 
	      		</Text>
	      		<View style={{paddingTop: 20}}>
		      		<Text style={{fontFamily: Descricao, fontSize: 12, fontWeight: '600', color: 'white', opacity: 0.8}}>
		      		  	{t("Me convide para")}
		      		</Text>
		      		<View style={{flexDirection: 'row'}}>
		      			{renderInter()}
		      		</View>
	      		</View>
	      	</View>
	     	</View>
    	</SafeAreaView>
  	)
};



const styles = StyleSheet.create({
  	container: {
    	flex: 1,
    	backgroundColor: Background
  	},
  	coisas: {
  		borderWidth: 1, 
  		borderColor: Primary
  	},
  	interes: {
		fontFamily: Descricao,
		fontSize: 12, 
		fontWeight: '600',
		color: Primary
	}
});

const mapStateToProps = (state) => {
   const { user } = state.Auth;
   return { user };
};

export default connect(mapStateToProps, { toggle_tab })(index);
