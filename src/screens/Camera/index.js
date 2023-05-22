import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

// import { useNavigation } from '@react-navigation/native';

import styles from './styles';

const CameraScreen = () => {
  const [isRecording, setIsRecording] = useState(false);
  const cameraRef = useRef(null);
  // const navigation = useNavigation();

  const onRecord = async () => {
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    const { status2 } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== 'granted' || status2 !== 'granted') {
      console.log('Permission denied');
      // Handle permission denied case
    }
    if (isRecording) {
      cameraRef.current.stopRecording();
    } else {
      const { uri } = await cameraRef.current.recordAsync();
      navigation.navigate('CreatePost', { videoUri: uri });
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.preview}
        type={Camera.Constants.Type.back}
        onRecordingStart={() => setIsRecording(true)}
        onRecordingEnd={() => setIsRecording(false)}
      />
      <TouchableOpacity
        onPress={onRecord}
        style={isRecording ? styles.buttonStop : styles.buttonRecord}
      />
    </View>
  );
};

export default CameraScreen;
