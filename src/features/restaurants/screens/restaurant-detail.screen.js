import React, { useState, useContext } from "react";
import styled from "styled-components/native";
import { ScrollView } from "react-native";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { List, Button } from "react-native-paper";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { colors } from "../../../infrastructure/theme/colors";

import { CartContext } from "../../../services/cart/cart.context";

const OrderButton = styled(Button).attrs({
  buttonColor: colors.brand.primary,
})`
  padding: ${(props) => props.theme.space[2]};
  width: 80%;
  align-self: center;
`;

export const RestaurantDetailScreen = ({ route, navigation }) => {
  const [sectionExpanded, setExpandedSection] = useState(null);
  const { restaurant } = route.params;
  const { addToCart } = useContext(CartContext);

  const expandSection = (section) => {
    if (sectionExpanded === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant} />
      <ScrollView>
        <List.Accordion
          title="Breakfast"
          left={(props) => <List.Icon {...props} icon="bread-slice" />}
          expanded={sectionExpanded === "breakfast" ? true : false}
          onPress={() => expandSection("breakfast")}
        >
          <List.Item title="Eggs Benedict" />
          <List.Item title="Classic Breakfast" />
        </List.Accordion>
        <List.Accordion
          title="Lunch"
          left={(props) => <List.Icon {...props} icon="hamburger" />}
          expanded={sectionExpanded === "lunch" ? true : false}
          onPress={() => expandSection("lunch")}
        >
          <List.Item title="Burger w. Fries" />
          <List.Item title="Steak Sandwich" />
          <List.Item title="Mushroom Soup" />
        </List.Accordion>
        <List.Accordion
          title="Dinner"
          left={(props) => <List.Icon {...props} icon="food-variant" />}
          expanded={sectionExpanded === "dinner" ? true : false}
          onPress={() => expandSection("dinner")}
        >
          <List.Item title="Spaghetti Bolognese" />
          <List.Item title="Veal Cutlet with Chicken Mushroom" />
          <List.Item title="Steak Fries" />
        </List.Accordion>
        <List.Accordion
          title="Drinks"
          left={(props) => <List.Icon {...props} icon="cup" />}
          expanded={sectionExpanded === "drinks" ? true : false}
          onPress={() => expandSection("drinks")}
        >
          <List.Item title="Coffee" />
          <List.Item title="Tea" />
          <List.Item title="Modelo" />
          <List.Item title="Coke" />
          <List.Item title="Fanta" />
        </List.Accordion>
      </ScrollView>
      <Spacer position="bottom" size="large">
        <OrderButton
          icon="cash"
          mode="contained"
          onPress={() => {
            addToCart(
              {
                item: "special",
                price: 1299,
                restaurant: restaurant,
              },
              restaurant,
            );
            navigation.navigate("Checkout");
          }}
        >
          Order special Only 12.99$!!
        </OrderButton>
      </Spacer>
    </SafeArea>
  );
};
