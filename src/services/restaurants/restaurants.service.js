import camelize from "camelize";
import { hostPlaces, isMock } from "../../utils/env";

export const restaurantsRequest = async (location) => {
  return fetch(
    `${hostPlaces}/placesNearby?location=${location}&mock=${isMock}`,
  ).then((res) => {
    return res.json();
  });
};

export const restaurantsTransform = ({ results = [] }) => {
  const mappedResults = results.map((restaurant) => {
    return {
      ...restaurant,
      address: restaurant.vicinity,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
    };
  });

  return camelize(mappedResults);
};
