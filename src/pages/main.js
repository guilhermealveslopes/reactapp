import React, { Component } from 'react';
import api from '../services/api';
import Canvas from 'react-native-canvas';
import { AppRegistry, StyleSheet, Text, CameraRoll, TouchableOpacity, Image, View, WebView } from 'react-native';
import { RNCamera, FaceDetector } from 'react-native-camera';
import tracking from 'jstracking';
import {PermissionsAndroid} from 'react-native';

var RNFS = require('react-native-fs');

// let canvas; 
// let imageName = "niceImageToLoad"
// let width = 300;
// let height = 600;
// var playerImage = new Image(canvas, height, width);
console.log(tracking);
export default class CameraPage extends Component {

    static navigationOptions = {
        title: "BioEspectro"
    };

    constructor(props) {
        super(props);
        this.state = {
          img : '',
      }
    };

    async _extractImageRGB(image, pixelX, pixelY) {
      return fs.readFile(image)
        .then(async data => {
          const img = data.getContext('2d')
          const imgData = img.getImageData(0,0,pixelX, pixelY)
          return imgData
        })
        .catch(error => error.message)
    }
      
    takePicture = async function(camera) {
        const options = { quality: 0.5, base64: true };
        const data = await camera.takePictureAsync(options);

        this.setState({
          img: data.uri
        })        
        CameraRoll.saveToCameraRoll( data.uri );
        console.log(data);
        RNFS.readFile(data.uri, "base64").then(response => {
          const ctx = response.getContext('2d');
          console.log(response);
          
        });
      };    
  render() {
    const{img}= this.state;
    return (
      <View style={styles.container}>
        <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>          
            <Image  source={{uri:img}} style={{  width: 200, height: 200}}/>
        </View>
        <Canvas ref={this.handleCanvas}/>
      </View>
    );
  }


}
var tracker = new tracking.ColorTracker("magenta");
console.log(tracker);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    alignSelf: 'center',
    margin: 20,
  },
});