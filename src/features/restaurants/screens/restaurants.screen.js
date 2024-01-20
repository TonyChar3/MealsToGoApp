import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import { FlatList, TouchableOpacity } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { FadeInView } from "../../../components/animations/fade.animation.js";

import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component.js";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Search } from "../components/search.component";
import { FavouritesBar } from "../../../components/favourites/favourite-bar.component.js";

import { LocationContext } from "../../../services/location/location.context.js";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { FavouritesContext } from "../../../services/favourites/favourites.context";

const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: { padding: 16 },
})``;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const RestaurantsScreen = ({ navigation }) => {
  const { error: locationError } = useContext(LocationContext);
  const { isLoading, restaurants, error } = useContext(RestaurantsContext);
  const { favourites } = useContext(FavouritesContext);

  const [isToggled, setIsToggled] = useState(false);

  const hasError = !!error || !!locationError;

  return (
    <>
      <SafeArea>
        <Search
          isFavouritesToggled={isToggled}
          onFavouritesToggle={() => setIsToggled(!isToggled)}
        />
        {isLoading && (
          <LoadingContainer>
            <Loading size={50} animating={isLoading} color={MD2Colors.red800} />
          </LoadingContainer>
        )}
        {isToggled && (
          <FavouritesBar
            favourites={favourites}
            onNavigate={navigation.navigate}
          />
        )}
        {!!error ||
          (!!locationError && (
            <Spacer position="left" size="large">
              <Text variant="error">
                Something went wrong fetching the data
              </Text>
            </Spacer>
          ))}
        {!hasError && (
          <RestaurantList
            data={restaurants}
            renderItem={({ item }) => (
              <>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("RestaurantDetail", {
                      restaurant: item,
                    })
                  }
                >
                  <Spacer position="bottom" size="large">
                    <FadeInView>
                      <RestaurantInfoCard restaurant={item} />
                    </FadeInView>
                  </Spacer>
                </TouchableOpacity>
              </>
            )}
            keyExtractor={(item) => item.name}
          />
        )}
      </SafeArea>
    </>
  );
};
