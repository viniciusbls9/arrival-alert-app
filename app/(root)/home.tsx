import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import { LocationObject } from "expo-location";
import { useEffect, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import {
  getDirection,
  getUserLocation,
  requestUserLocationPermissions,
} from "@/src/usecases";

const Home = () => {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [destination, setDestination] = useState("");
  const [currentLocation, setCurrentLocation] = useState<string | null>("");

  useEffect(() => {
    requestUserLocationPermissions(setCurrentLocation);
  }, []);

  const onSubmit = () => {};

  // const getDirectionFunc = async () => {
  //   const directionResponse = await getDirection({
  //     origin: "Avenida Pedro Lessa 2000",
  //     destination: "Avenida Pedro lessa 2701",
  //   });

  //   console.log(directionResponse);
  // };

  // useEffect(() => {
  //   getDirectionFunc();
  // }, []);

  useEffect(() => {
    getUserLocation({
      callback: (response: LocationObject) => setLocation(response),
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 flex items-center justify-center">
      <TextInput
        value={currentLocation as string}
        className="w-11/12 h-12 rounded-md my-6 drop-shadow-sm bg-white placeholder:p-4 placeholder:italic"
        placeholder={currentLocation as string}
        defaultValue=""
        onChangeText={(value) => setCurrentLocation(value)}
      />

      <TextInput
        value={destination}
        className="w-11/12 h-12 rounded-md mb-6 drop-shadow-sm bg-white placeholder:p-4 placeholder:italic"
        placeholder="Escolha seu endereço de destino"
        defaultValue=""
        onChangeText={(value) => setDestination(value)}
      />

      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          />
        </MapView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: "100%",
  },
});

export default Home;
