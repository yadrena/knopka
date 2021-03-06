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

export default (workScreens, home) => Actions.create(
  <Scene key="root">
    <Scene key="authScreens" hideNavBar={true} type="push" initial={!workScreens}>
      <Scene key="login" component={Login} initial={true}/>
      <Scene key="register" component={Register} />
      <Scene key="thanks" component={SimpleScreen}
             header={i18n.t('thanks.header')} buttonText={i18n.t('thanks.button')}
             onButtonPress={() => Actions.workScreens()}/>
      <Scene key="reqRecover" component={RequestRecover} />
      <Scene key="recoverManual" component={SimpleScreen}
             header={i18n.t('recoverManual.header')}
             message={i18n.t('recoverManual.message')}
             buttonText={i18n.t('commons.next')}
             onButtonPress={() => Actions.changePassword()}/>
      <Scene key="changePassword" component={ChangePassword} type="replace"/>
      <Scene key="passwordChanged" component={SimpleScreen}
             header={i18n.t('passwordChanged.header')}
             buttonText={i18n.t('commons.next')}
             onButtonPress={() => Actions.workScreens()}/>
    </Scene>
    <Scene key="workScreens" hideNavBar={true} initial={workScreens}>
      <Scene key="wifiManual" component={SimpleScreen} initial={!home}
             message={i18n.t('wifiManual.message')}  buttonStyle="button"
             buttonText={i18n.t('commons.next')} bigLogo={false}
             onButtonPress={() => Actions.connectMat()}/>
      <Scene key="connectMat" component={ConnectMat}/>
      <Scene key="connectingMat" component={SimpleScreen}
             header={i18n.t('connectingMat.header')}
             message={i18n.t('connectingMat.message')}
             bigLogo={false}/>
      <Scene key="connectionFailed" component={SimpleScreen}
             header={i18n.t('connectionFail.header')}
             message={i18n.t('connectionFail.message')}
             buttonText={i18n.t('connectionFail.button')}
             onButtonPress={() => Actions.connectMat()}
             bigLogo={false}/>
      <Scene key="home" component={Home} initial={home}/>
      <Scene key="settings" component={Settings}/>
    </Scene>
  </Scene>
);
