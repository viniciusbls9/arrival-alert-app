import polyline from "@mapbox/polyline";

const decodePolyline = (polylineValue: string) => {
  const decodedPolyline = polyline.decode(polylineValue);

  const coordinates = decodedPolyline.map(([lat, lng]) => ({
    latitude: lat,
    longitude: lng,
  }));

  return coordinates;
};

export { decodePolyline };
