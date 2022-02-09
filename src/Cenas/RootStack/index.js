import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';
import { SignedInRoutes, AwesomeAccess } from '../../../Routes';
import { Provider } from 'react-native-paper';

import { connect } from 'react-redux';
import { retrive_user } from '../../Redux/actions';

const index = (props) => {
   useEffect(() => {
      props.retrive_user()
   }, []);

   return props.initializing ? 
      <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large" color={'#DF1884'} />
      </View> : props.user.photos?.length > 0 ?  (
         <Provider>
            <SignedInRoutes /> 
         </Provider>
   ) : (
      <AwesomeAccess />
   ) 
}

const mapStateToProps = (state) => {
   const { user, initializing } = state.Auth;
   return { user, initializing };
};

export default connect(mapStateToProps, { retrive_user })(index);