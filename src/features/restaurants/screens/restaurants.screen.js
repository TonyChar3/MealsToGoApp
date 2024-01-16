import React from "react";
import { FlatList } from "react-native";
import { Searchbar } from "react-native-paper";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import styled from "styled-components/native";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";

const SearchInputView = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: { padding: 16 },
})``;

export const RestaurantsScreen = () => {
  return (
    <>
      <SafeArea>
        <SearchInputView>
          <Searchbar />
        </SearchInputView>
        <RestaurantList
          data={[
            { name: 1 },
            { name: 2 },
            { name: 3 },
            { name: 4 },
            { name: 5 },
            { name: 6 },
          ]}
          renderItem={() => (
            <>
              <Spacer position="bottom" size="large">
                <RestaurantInfoCard />
              </Spacer>
            </>
          )}
          keyExtractor={(item) => item.name}
        />
      </SafeArea>
    </>
  );
};
