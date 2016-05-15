import React, {Component} from 'react';
import {Actions, Scene, Router} from 'react-native-router-flux';
import { Provider, connect } from 'react-redux';
import configureStore from './store/configureStore';
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
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
    setTimeout( () => SplashScreen.hide(), 2000);
  }

  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="root" hideNavBar={true} hideTabBar={true} type="jump">
            <Scene key="login" hideNavBar={true} component={Login} title="Login"/>
            <Scene key="register" hideNavBar={true} component={Register} title="Register"/>
            <Scene key="home" hideNavBar={true} component={Home} title="Home"/>
          </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }
}