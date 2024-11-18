import { getCurrentPositionAsync, reverseGeocodeAsync } from "expo-location";

export const reverseGeocoding = async () => {
  const currentPosition = await getCurrentPositionAsync();
  const reversedGeocode = await reverseGeocodeAsync({
    latitude: currentPosition.coords.latitude,
    longitude: currentPosition.coords.longitude,
  });

  return {
    street: reversedGeocode[0].street,
    streetNumber: reversedGeocode[0].streetNumber,
    formattedAddress: reversedGeocode[0].formattedAddress,
  };
};
