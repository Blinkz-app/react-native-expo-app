import React, { useEffect } from 'react';
import { View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import { THETA_API_SECRET, THETA_API_KEY } from '@env';


 async function storage(filename, path) {
    const sa_id = THETA_API_KEY
    const sa_secret = THETA_API_SECRET
    const createURLOptions = {
      method: 'POST',
      url: 'https://api.thetavideoapi.com/upload',
      headers: {
        'x-tva-sa-id': {sa_id},
        'x-tva-sa-secret': {sa_secret},
      },
    };

    const createURLResponse = await fetch(createURLOptions.url, createURLOptions);
    const createURLResponseBody = await createURLResponse.json();
    const presignedUrl = createURLResponseBody.body.uploads[0].presigned_url;

    // const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // if (status !== 'granted') {
    //   console.log('Permission not granted');
    //   return;
    // }

    const fileInfo = await FileSystem.getInfoAsync(path);
    const { uri } = fileInfo;

    const uploadResponse = await fetch(presignedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      body: await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      }),
    });
    const uploadResponseBody = await uploadResponse.text();

    console.log(uploadResponseBody);
  }

  export default storage;
