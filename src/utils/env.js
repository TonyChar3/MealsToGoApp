import { Platform } from "react-native";

const liveHostGeoCode = "https://geocode-2sw5o2ecua-uc.a.run.app";
const localHost = "http://127.0.0.1:5001/mealstogo-b3577/us-central1";
const liveHostPlaces = "https://placesnearby-2sw5o2ecua-uc.a.run.app";

export const isAndroid = Platform.OS === "android";
export const isDevelopment = process.env.NODE_ENV === "development";
export const hostGeoCode =
  !isDevelopment || isAndroid ? liveHostGeoCode : localHost;
export const hostPlaces =
  !isDevelopment || isAndroid ? liveHostPlaces : localHost;
export const isMock = true;
// export const hostGeoCode = liveHostGeoCode;
// export const hostPlaces = liveHostPlaces;
// export const isMock = false;
