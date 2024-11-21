import {
  LocationObject,
  requestForegroundPermissionsAsync,
  requestBackgroundPermissionsAsync,
  getCurrentPositionAsync,
  reverseGeocodeAsync,
} from "expo-location";
import { reverseGeocoding } from "../reverseGeoconding/ReverseGeocodingUseCase";

export const requestUserLocationPermissions = async (
  setInitialLocation: (value: React.SetStateAction<string | null>) => void
) => {
  const { granted } = await requestForegroundPermissionsAsync();
  const { granted: backgroundGranted } =
    await requestBackgroundPermissionsAsync();

  if (granted && backgroundGranted) {
    const currentPosition = await reverseGeocoding();
    setInitialLocation(currentPosition.formattedAddress);
  }
};
