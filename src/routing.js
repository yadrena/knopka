import React from 'react';
import {Actions, Scene} from 'react-native-router-flux';
import i18n from './i18n/i18n';
import Login from "./screens/Login";
import Register from "./screens/Register";
import SimpleScreen from "./screens/SimpleScreen";
import RequestRecover from "./screens/RequestRecover";
import ChangePassword from "./screens/ChangePassword";
import Home from "./screens/Home";
import Settings from "./screens/Settings";
import ConnectMat from "./screens/ConnectMat";

export default Actions.create(
  <Scene key="root">
    <Scene key="authScreens" hideNavBar={true} type="push">
      <Scene key="login" component={Login} initial={true}/>
      <Scene key="register" component={Register} />
      <Scene key="thanks" component={SimpleScreen}
             header={i18n.t('regThanks')} buttonText={i18n.t('regThanksLink')}
             onButtonPress={() => Actions.workScreens()}/>
      <Scene key="reqRecover" component={RequestRecover} />
      <Scene key="recoverManual" component={SimpleScreen}
             header={i18n.t('recoverManualHeader')}
             message={i18n.t('recoverManualMessage')}
             buttonText={i18n.t('next')}
             onButtonPress={() => Actions.changePassword()}/>
      <Scene key="changePassword" component={ChangePassword} type="replace"/>
      <Scene key="passwordChanged" component={SimpleScreen}
             header={i18n.t('passwordChangedHeader')}
             buttonText={i18n.t('next')}
             onButtonPress={() => Actions.workScreens()}/>
    </Scene>
    <Scene key="workScreens" hideNavBar={true} >
      <Scene key="wifiManual" component={SimpleScreen} initial={true}
             message={i18n.t('wifiManual')}  buttonStyle="button"
             buttonText={i18n.t('next')} bigLogo={false}
             onButtonPress={() => Actions.connectMat()}/>
      <Scene key="connectMat" component={ConnectMat}/>
      <Scene key="home" component={Home}/>
      <Scene key="settings" component={Settings}/>
    </Scene>
  </Scene>
);
