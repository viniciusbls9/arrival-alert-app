import { watchPositionAsync, LocationAccuracy } from "expo-location";

export const getUserLocation = ({ callback }: { callback: Function }) => {
  watchPositionAsync(
    {
      accuracy: LocationAccuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 1,
    },
    (response) => {
      callback(response);
    },
  );
};
