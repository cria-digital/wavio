import React, {useState, useEffect} from 'react';
import {
  Alert,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  PermissionsAndroid,
  ActivityIndicator
} from 'react-native';
import {
  Background,
  Titulo,
  Descricao,
  Primary,
  CinzaEscuro,
} from '../../Styles';
import GoButton from '../../Components/Buttons/GoButton';
import BackButton from '../../Components/Buttons/BackButton';
import Icon from 'react-native-vector-icons/Ionicons';
import Carousel from 'react-native-snap-carousel';
import {Checkbox} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {useNavigation} from '@react-navigation/native';

import {translate} from '../../Locales';
const t = translate;

import {connect} from 'react-redux';
import {retrive_user} from '../../Redux/actions';

import {HelpersUser} from '../../Helpers';
const helpersUser = new HelpersUser();

const AddPhotos = props => {
  const [photos, setPhotos] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [checked, setChecked] = React.useState(false);
  const [checkboxState, setCheckboxState] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    setPhotos(props.user.photos);
    props.user.photos?.[0]?.profile
      ? setCheckboxState(true)
      : setCheckboxState(false);
  }, []);

  const selecionarEntrada = () => {
    Alert.alert(t('Selecione'), t('de onde virá a foto'), [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: t('Câmera'),
        onPress: () =>
          requestCameraPermission().then(resp =>
            resp ? captureImage('photo') : null,
          ),
      },
      {text: t('Galeria'), onPress: () => chooseFile('photo')},
    ]);
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async type => {
    ImagePicker.openCamera({
      width: 320,
      height: 180,
    }).then(image => {
      var img = [
        {
          sourceURL: image.path,
          mime: image.mime,
          profile: false,
          situacao: 'upload',
        },
      ];
      var PHOTOS = photos.concat(img);
      setPhotos(PHOTOS);
    });
  };

  const chooseFile = type => {
    ImagePicker.openPicker({
      width: 320,
      height: 180,
      multiple: true,
    }).then(images => {
      var imgs = [];
      images.forEach(img =>
        imgs.push({
          sourceURL: img.path,
          mime: img.mime,
          profile: false,
          situacao: 'upload',
        }),
      );
      var PHOTOS = photos.concat(imgs);
      setPhotos(PHOTOS);
    });
  };

  const findProfile = () => {
    setLoading(true);
    if (photos.length > 0) {
      const result = photos.find(fruit => fruit.profile === true);
      result !== undefined
        ? salvarFotos()
        : (alert(t('Selecione a foto de perfil')), setLoading(false));
    } else {
      alert(t('Selecione as suas fotos'));
      setLoading(false);
    }
  };

  const salvarFotos = () => {
    if (photos.length > 0) {
      var itemsProcessed = 0;
      photos.forEach((item, index, array) => {
        mandarPhoto(item).then(() => {
          itemsProcessed++;
          if (itemsProcessed === array.length) {
            props.retrive_user();
          }
        });
      });
    } else {
      alert(t('Selecione as suas fotos'));
      setLoading(false);
    }
  };

  const mandarPhoto = async item => {
    switch (item.situacao) {
      case 'upload':
        await helpersUser.SendPhotos({
          user: props.user.id,
          profile: item.profile,
          sourceURL: item.sourceURL,
          mime: item.mime,
        });
        break;
      case 'fotoBanco':
        await helpersUser.ChangePhotoProfile(item.id);
        break;
      default:
        console.log('default');
    }
  };

  const procurarFoto = index => {
    photos?.[index].profile ? setCheckboxState(true) : setCheckboxState(false);
    setActiveIndex(index);
  };

  const fotoDePerfil = () => {
    photos[activeIndex].situacao == 'banco' ? mudarFotoBanco() : null;
    photos[activeIndex].situacao == 'upload' ? mandarFotoUpload() : null;
    photos[activeIndex].situacao == 'fotoBanco' ? mudarFotoBanco() : null;
  };

  const mudarFotoBanco = () => {
    const resultado = photos.map(item => ({...item, profile: false}));
    resultado.splice(activeIndex, 1, {
      ...photos[activeIndex],
      profile: true,
      situacao: 'fotoBanco',
    });
    setPhotos(resultado);
    setCheckboxState(true);
  };

  const mandarFotoUpload = () => {
    const resultado = photos.map(item => ({...item, profile: false}));
    resultado.splice(activeIndex, 1, {...photos[activeIndex], profile: true});
    setPhotos(resultado);
    setCheckboxState(true);
  };

  const deletar = (item, index) => {
    item.profile
      ? alert(
          'Voce não pode excluir sua foto de perfil, por favor escolha outra antes!',
        )
      : agoraDeleta(item, index);
  };

  const agoraDeleta = (item, index) => {
    setLoading(true);
    var filtered = photos.filter(value => value !== item);

    item.situacao == 'banco'
      ? helpersUser
          .DeletePhoto(item.id)
          .then(e => (e ? (setPhotos(filtered), setLoading(false)) : null))
      : null;
    item.situacao == 'fotoBanco'
      ? helpersUser
          .DeletePhoto(item._id)
          .then(e => (e ? (setPhotos(filtered), setLoading(false)) : null))
      : null;
    item.situacao == 'upload' ? (setPhotos(filtered), setLoading(false)) : null;
  };

  const _renderItem = ({item, index}) => {
    return (
      <ImageBackground
        style={{
          borderRadius: 5,
          height: 250,
          padding: 8,
          marginLeft: 25,
          marginRight: 25,
          alignItems: 'flex-end',
        }}
        imageStyle={{borderRadius: 10}}
        source={{uri: item.url || item.sourceURL}}
        resizeMode="cover">
        <TouchableOpacity onPress={() => deletar(item, index)}>
          <Icon name="close-circle" size={35} color={'#FF5757'} />
        </TouchableOpacity>
      </ImageBackground>
    );
  };

   return (
      <SafeAreaView style={{flex: 1, backgroundColor: Background}}>
         <View style={{flex: 1, backgroundColor: Background, padding: 25}}>
            <View style={{flex: 10}}>
               <Text style={styles.titulo}>{t('Adicionar fotos')}</Text>
               <Text style={styles.descricao}>
                  {t(
                    'Para que as pessoas te conheçam melhor e para uma experíência completa na plataforma adicione algumas fotos suas',
                  )}
                  .
               </Text>
               {photos.length == 0 ? (
                  <View style={{alignItems: 'center'}}>
                    <TouchableOpacity
                      style={[styles.addPhotos, {height: 318}]}
                      onPress={() => selecionarEntrada()}>
                      <Icon name="add-outline" size={150} color={'#848484'} />
                    </TouchableOpacity>
                  </View>
               ) : (
               <View style={{alignItems: 'center'}}>
                 <View style={{height: 270}}>
                   <Carousel
                     layout={'stack'}
                     layoutCardOffset={18}
                     data={photos}
                     sliderWidth={300}
                     itemWidth={300}
                     renderItem={_renderItem}
                     useScrollView={true}
                     onSnapToItem={index => procurarFoto(index)}
                   />
                 </View>
                 <View style={{flexDirection: 'row', alignItems: 'center'}}>
                   <BouncyCheckbox
                     size={22}
                     fillColor={Primary}
                     isChecked={checkboxState}
                     disableBuiltInState={true}
                     ref={(ref: any) => (bouncyCheckboxRef = ref)}
                     unfillColor={Background}
                     iconStyle={{borderColor: Primary}}
                     onPress={() => fotoDePerfil()}
                   />
                   <Text style={styles.fto}>{t('Usar como foto de perfil')}</Text>
                 </View>
                 <TouchableOpacity
                   style={[styles.addPhotos, {height: 90, marginTop: 20}]}
                   onPress={() => selecionarEntrada()}>
                   <Icon name="add-outline" size={80} color={'#848484'} />
                 </TouchableOpacity>
               </View>
             )}
            </View>
            {
               loading ? <ActivityIndicator size="small" color={Primary} /> : <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
               <BackButton press={() => navigation.goBack()} />
               <GoButton
                  width={100}
                  press={() => findProfile()}
                  disabled={loading}
               />
            </View>
            }
            
         </View>
      </SafeAreaView>
   );
};

const styles = StyleSheet.create({
  titulo: {
    fontFamily: Titulo,
    fontSize: 38,
    color: 'white',
  },
  descricao: {
    fontFamily: Descricao,
    fontSize: 14,
    color: 'white',
    marginVertical: 15,
  },
  addPhotos: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CinzaEscuro,
    borderRadius: 10,
    width: 300,
  },
  fto: {
    fontFamily: Descricao,
    color: 'white',
  },
});

const mapStateToProps = state => {
  const {user} = state.Auth;
  return {user};
};

export default connect(mapStateToProps, {retrive_user})(AddPhotos);
