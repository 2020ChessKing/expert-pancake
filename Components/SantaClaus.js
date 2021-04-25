import React from 'react';
import LottieView from 'lottie-react-native';

export default class SantaAnimation extends React.Component {
  render() {
    return (
      <LottieView
        source = { require('../assets/13015-santa-claus.json') }
        style = {{ width : "30%", alignSelf : 'center', }}
        autoPlay loop 
      />
    )
  }
}