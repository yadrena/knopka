import React, {Component} from 'react';
import {Actions, Scene, Router} from 'react-native-router-flux';
import { Provider, connect } from 'react-redux';
import configureStore from './store/configureStore';
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import WifiManual from "./screens/WifiManual";
import ConnectMat from "./screens/ConnectMat";
import {checkWifi} from './actions/Actions';

import SplashScreen from '@remobile/react-native-splashscreen';


const RouterWithRedux = connect()(Router);
const store = configureStore();

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    store.dispatch(checkWifi());
    setTimeout( () => SplashScreen.hide(), 1000);
  }

  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="root" type="jump">
            <Scene key="authScreens" hideNavBar={true}>
              <Scene key="login" component={Login}/>
              <Scene key="register" component={Register} type="push"/>
            </Scene>
            <Scene key="workScreens" hideNavBar={true}>
              <Scene key="wifiManual" component={WifiManual} initial={true}/>
              <Scene key="connectMat" component={ConnectMat}/>
              <Scene key="home" component={Home} title="Home"/>
            </Scene>
          </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }
}