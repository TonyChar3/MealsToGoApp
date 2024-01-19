import { StatusBar, SafeAreaView, Platform } from "react-native";
import styled from "styled-components/native";

const statusBarHeight = Platform.OS === "android" ? StatusBar.currentHeight : 0;

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  margin-top: ${statusBarHeight}px;
  background-color: ${(props) => props.theme.colors.bg.primary};
`;
