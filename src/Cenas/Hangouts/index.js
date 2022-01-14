import React, {useRef, useState, useEffect} from 'react';

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
import { BlurView, VibrancyView } from "@react-native-community/blur";
import Carousel from 'react-native-snap-carousel';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { HelpersHangouts, HelpersInterests } from "../../Helpers";
const helpersHangouts = new HelpersHangouts();
const helpersInterests = new HelpersInterests();

import { connect } from 'react-redux';
import { toggle_tab } from '../../Redux/actions';

import { translate } from '../../Locales'
const t = translate

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

	const carrossel = useRef();

	const next = () => {
		if((cont+1) < data[select]?.photos?.length){
			setCont(cont + 1)
		}
	}

	const prev = () => {
		if(cont > 0){
			setCont(cont - 1)
		}
	}
  	

  	const _renderItem = ({item, index}) => {
      return (
      	<ImageBackground
        		style={{ borderRadius: 5, height: '100%' }}
        		source={{uri: item.photos[cont]?.url || item.photos[cont]?.uri}}
        		resizeMode='cover'
        	> 
    
      		<View style={{flex: 1, flexDirection: 'row'}}>
      			<TouchableOpacity style={{flex: 2}} onPress={() => prev()} />
      			<TouchableOpacity style={{flex: 1}}/>
      			<TouchableOpacity style={{flex: 2}} onPress={() => next()} />
      		</View>
      		<View style={{flexDirection: 'row'}}>
      			<View style={{backgroundColor: 'rgba(255, 87, 87, 0.25)', height: 55, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
	      			<Icon name="close-outline" size={30} color={'white'} />
	      		</View>
	      		<View style={{backgroundColor: 'rgba(24, 178, 76, 0.25)', height: 55, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
	      			<Icon name="checkmark-outline" size={30} color={'white'} />
	      		</View>
      		</View>
        	</ImageBackground>
      )
   }

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

  	return (
    	<SafeAreaView style={styles.container}>
	    	<View style={{flex: 2}}>
		    	<Carousel
	            layout={'default'}
	            layoutCardOffset={14}
	            ref={carrossel}
	            data={data}
	            sliderWidth={windowWidth}
	            itemWidth={windowWidth}
	            renderItem={_renderItem}
	            useScrollView={true}
	            inactiveSlideShift={0}
        			useScrollView={true}
	            onSnapToItem={index => {setSelect(index), setCont(0)}} 
	         />
	    	</View>
	      <View style={{flex: 1, backgroundColor: '#424343', borderTopLeftRadius: 10, borderTopRightRadius: 10, marginTop: -10}}>
	      	<View style={{backgroundColor: '#2D2D2D40', margin: 20, flex: 1, borderRadius:20, padding: 10}}>
	      		<Text style={{fontFamily: Titulo, fontSize: 22, color: 'white', fontWeight: 'bold'}}>
	      		  	{data[select]?.name} 
	      		</Text>
	      		<Text style={{fontSize: 14, fontWeight: '500', marginTop: 10, color: 'white'}}>
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
	     	<View style={{justifyContent: 'space-between', flexDirection: 'row', padding: 30, position: 'absolute', width: '100%', height: '100%'}}>
      			<BackButtonSolid callback={(value) => props.toggle_tab(value)}/>
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
							  			{/*cont+1}/{item.photos?.length*/} 
									</Text>
								</View>
							</BlurView>,
			      		android: <View	style={[styles.styleViewBlur, {height: 44, width: 75, margin: 10 }]}>
			      			<View style={{flexDirection: 'row', justifyContent: 'space-evenly', flex:1, alignItems: 'center'}}>
									<Icon name="image-outline" size={20} color={'white'} />
									<Text  style={{fontFamily: Titulo, color: 'white', fontSize: 14, fontWeight: '700'}}>
							  			{cont+1}/{data[select]?.photos?.length} 
									</Text>
								</View>
			      		</View>
			      	})
			      }
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
	},
	styleViewBlur: {
		borderRadius: 10,
		shadowOpacity: 1,
		shadowColor: '#000',
		shadowOffset: { width: 10, height: 10 },
		shadowRadius: 5,
		elevation: 5,
		backgroundColor: "rgba(255, 255, 255, 0.3)"
	}
});

const mapStateToProps = (state) => {
   const { user } = state.Auth;
   return { user };
};

export default connect(mapStateToProps, { toggle_tab })(index);
