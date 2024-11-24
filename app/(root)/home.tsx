import { SafeAreaView } from "react-native-safe-area-context";
import {
  LocationObjectCoords,
  LocationObject,
  LocationSubscription,
} from "expo-location";
import React, { useEffect, useState } from "react";
import { Text, TextInput } from "react-native";
import {
  getDirection,
  getUserLocation,
  requestUserLocationPermissions,
} from "@/src/usecases";
import Button from "@/src/components/Button";
import { DirectionCoordsProps } from "@/types";

// const DESTINATION = {
//   latitude: -23.613701,
//   longitude: -46.633339,
// };

const PROXIMITY_RADIUS = 50;

export default function App() {
  const [initialLocation, setInitialLocation] = useState<string | null>("");
  const [destination, setDestination] = useState<string | null>("");
  const [destinationCoords, setDestinationCoords] =
    useState<DirectionCoordsProps | null>();
  const [isNearDestination, setIsNearDestination] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let subscription: LocationSubscription | undefined;

    const startWatching = async () => {
      requestUserLocationPermissions(setInitialLocation);

      subscription = await getUserLocation({
        callback: (response: LocationObject) => {
          validateProximity(response.coords);
        },
      });
    };

    startWatching();

    return () => {
      if (subscription) subscription.remove();
    };
  }, [destinationCoords]);

  const onSubmit = async () => {
    if (destination) {
      const directionResponse = await getDirection({
        origin: initialLocation as string,
        destination: destination as string,
      });

      const route = directionResponse.routes.find(
        (route: any) => route.legs && route.legs.length > 0
      );

      if (route) {
        const endLocation = route.legs[0].end_location;
        setDestinationCoords(endLocation);
      } else {
        setErrorMessage(
          "Problemas para iniciar a rota. Revise o endereço de destino."
        );
      }
    }
  };

  const validateProximity = (currentLocation: LocationObjectCoords) => {
    if (destinationCoords) {
      const distance = getDistanceFromLatLonInMeters(
        currentLocation.latitude,
        currentLocation.longitude,
        destinationCoords.lat,
        destinationCoords.lng
      );

      setIsNearDestination(distance <= PROXIMITY_RADIUS);
    }
  };

  const getDistanceFromLatLonInMeters = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371000; // Raio da Terra em metros
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distância em metros
  };

  return (
    <SafeAreaView className="flex px-4">
      <TextInput
        value={initialLocation as string}
        className="w-full h-12 rounded-md my-6 drop-shadow-sm bg-white placeholder:p-4 placeholder:italic"
        placeholder={initialLocation as string}
        defaultValue=""
      />

      <TextInput
        value={destination as string}
        className="w-full h-12 rounded-md mb-6 drop-shadow-sm bg-white placeholder:p-4 placeholder:italic"
        placeholder="Escolha seu endereço de destino"
        defaultValue=""
        onChangeText={(value) => setDestination(value)}
      />

      <Button
        onPress={onSubmit}
        title="Ir"
        className="w-full h-14 rounded-md"
      />

      {errorMessage && (
        <Text className="pt-2 text-danger-600 font-medium">{errorMessage}</Text>
      )}

      <Text>
        {isNearDestination
          ? "Você chegou ao destino!"
          : "A caminho do destino..."}
      </Text>
    </SafeAreaView>
  );
}
