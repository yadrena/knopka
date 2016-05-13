import React, {Component} from 'react';
import {Actions, Scene, Router} from 'react-native-router-flux';
import { Provider } from 'react-redux';
import {connect} from 'react-redux';
import configureStore from './store/configureStore';
import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";

const RouterWithRedux = connect()(Router);
const store = configureStore();

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key="root">
            <Scene key="home" component={Home} title="Home"/>
            <Scene key="login" component={Login} title="Login"/>
            <Scene key="register" component={Register} title="Register"/>
          </Scene>
        </RouterWithRedux>
      </Provider>
    );
  }
}