import {
  watchPositionAsync,
  LocationAccuracy,
  LocationSubscription,
} from "expo-location";

export const getUserLocation = async ({
  callback,
}: {
  callback: Function;
}): Promise<LocationSubscription> => {
  const position = await watchPositionAsync(
    {
      accuracy: LocationAccuracy.Highest,
      timeInterval: 5000,
      distanceInterval: 10,
    },
    (response) => {
      callback(response);
    }
  );

  return position;
};
