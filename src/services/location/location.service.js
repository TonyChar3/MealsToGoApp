import camelize from "camelize";
import { hostGeoCode, isMock } from "../../utils/env";

export const locationRequest = async (searchTerm) => {
  return fetch(`${hostGeoCode}/geocode?city=${searchTerm}&mock=${isMock}`).then(
    (res) => {
      const data = res.json();
      return data;
    },
  );
};

export const locationTransform = (result) => {
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;

  return { lat, lng, viewport: geometry.viewport };
};
