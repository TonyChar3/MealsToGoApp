import React, { useRef, useContext } from "react";
import styled from "styled-components";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { TouchableOpacity } from "react-native";
import { Text } from "../../../components/typography/text.component";

import { Camera } from "expo-camera";

import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const ProfileCamera = styled(Camera)`
  width: 100%;
  height: 100%;
`;

export const CameraScreen = ({ navigation }) => {
  const { user } = useContext(AuthenticationContext);
  const [hasPermission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef();

  const snap = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();
      AsyncStorage.setItem(`${user.uid}-photo`, photo.uri);
      navigation.goBack();
    }
  };

  if (!hasPermission) {
    return <Text>loading</Text>;
  }

  if (!hasPermission.granted) {
    return <Text>No access to camera</Text>;
  }

  return (
    <TouchableOpacity onPress={snap}>
      <ProfileCamera
        ref={(camera) => (cameraRef.current = camera)}
        style={{ width: "100%", height: "100%" }}
        type={Camera.Constants.Type.front}
      />
    </TouchableOpacity>
  );
};
