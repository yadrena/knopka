import React, {PropTypes} from 'react'
import {View, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import WorkScreenHeader from '../components/WorkScreenHeader';
import {workScreenStyle} from '../styles/common';
import I18n from '../i18n/i18n';

export default class WorkScreen extends React.Component {
  static propTypes = {
    lefty: PropTypes.object,
    righty: PropTypes.object,
    contentStyle: PropTypes.object
  };

  static defaultProps = {
    lefty: {
      title: I18n.t('backButton'),
      action: Actions.pop
    }
  };

  render() {
    let {lefty, righty} = this.props;
    return (
      <View style={workScreenStyle.container}>
        <WorkScreenHeader lefty={lefty} righty={righty}/>
        <View style={[workScreenStyle.content, this.props.contentStyle]}>
          {this.props.children}
        </View>
      </View>
    );
  }
}


