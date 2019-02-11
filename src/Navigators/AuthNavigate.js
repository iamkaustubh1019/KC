import React from 'react';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Otp from '../pages/Otp';
import { LoginScreen, SignUpScreen, OtpScreen } from '../Components/ScreenNames';
import { createStackNavigator  } from 'react-navigation';

let AppScreens = {
  LoginScreen: {
    screen: Login
  },
  SignUpScreen: {
    screen: SignUp
  },
  OtpScreen: {
    screen: Otp
  },
}

const Bottomtransition = (index, position, width) => {
  const sceneRange = [index-1, index, index+1];
  const outputWidth = [width,0,0];
  const transition = position.interpolate({
    inputRange: sceneRange,
    outputRange: outputWidth,
  });

  return {
    transform: [{ translateX: transition }]
  }
}


const TransitionConfiguration = () => {
  return {
    screenInterpolator: (sceneProps) => {
      const position = sceneProps.position;
      const scene = sceneProps.scene;
      const index = scene.index;
      const width = sceneProps.layout.initWidth;

      return Bottomtransition(index, position, width);
    }
  }
}
const AuthNavigate = createStackNavigator(AppScreens, {
    transitionConfig: TransitionConfiguration
});

export default AuthNavigate;
