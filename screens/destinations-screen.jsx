import { useCallback, useEffect, useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from "react-native";

import { apiBaseURL } from "../constants/api";

const DestinationCard = ({
  name,
  minBudget,
  maxBudget,
  address,
  openTime,
  closeTime,
  isClosed,
  imgThumbnail,
  rating,
}) => {
  const roundedRating = Number(rating) !== 0 ? Number(rating).toFixed(1) : 0;
  const formatIDRCurrency = (num) =>
    `Rp. ${Number(num).toFixed(2).toLocaleString()}`;

  return (
    <View style={{ margin: 20 }}>
      <ImageBackground
        source={{ uri: imgThumbnail }}
        imageStyle={{ borderRadius: 15 }}
        style={destinationCardStyles.thumbnail}
      >
        <Text style={destinationCardStyles.rating}>{roundedRating}</Text>
      </ImageBackground>
      <Text style={destinationCardStyles.name}>{name}</Text>
      <Text style={destinationCardStyles.address}>{address}</Text>
      <View style={styles.rowFlex}>
        <Text style={destinationCardStyles.footer}>
          {openTime.substring(0, 5)}
        </Text>
        <Text style={destinationCardStyles.footer}>
          {closeTime.substring(0, 5)}
        </Text>
      </View>
      <View style={styles.rowFlex}>
        <Text style={destinationCardStyles.footer}>
          {formatIDRCurrency(minBudget)}
        </Text>
        <Text style={destinationCardStyles.footer}>
          {formatIDRCurrency(maxBudget)}
        </Text>
      </View>
    </View>
  );
};

const destinationCardStyles = StyleSheet.create({
  thumbnail: {
    justifyContent: "flex-end",
    width: null,
    height: 200,
  },
  rating: {
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 10,
    marginHorizontal: 20,
  },
  name: {
    marginVertical: 10,
    fontWeight: "bold",
    fontSize: 24,
  },
  address: {
    marginBottom: 10,
    opacity: 0.5,
  },
  footer: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export const DestinationsScreen = () => {
  const [destinations, setDestinations] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getDestinations = async () => {
    try {
      const response = await fetch(`${apiBaseURL}/places/places_list`);

      const json = await response.json();
      setDestinations(json.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getDestinations();
    setRefreshing(false);
  });

  useEffect(() => {
    getDestinations();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={destinations}
        refreshing={refreshing}
        onRefresh={onRefresh}
        renderItem={({ item }) => (
          <DestinationCard
            name={item["place-name"]}
            address={item["place-address"]}
            imgThumbnail={item["place-thumb-image"]}
            maxBudget={item["place-budget-max"]}
            minBudget={item["place-budget-min"]}
            openTime={item["open-time"]}
            closeTime={item["close-time"]}
            isClosed={item["is-closed"]}
            rating={item["place-rating"]}
          />
        )}
        keyExtractor={(destination) => destination["place-id"]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  rowFlex: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
