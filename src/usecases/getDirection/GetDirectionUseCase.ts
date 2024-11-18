import { AxiosHttpClient } from "@/src/infra/http/axios-http-client";
import { HttpStatusCode } from "@/types";

export const getDirection = async ({
  destination,
  origin,
}: {
  destination: string;
  origin: string;
}) => {
  const httpClient = new AxiosHttpClient();

  const buildUrl = `${process.env.EXPO_PUBLIC_DIRECTIONS_API_URL}${destination}&origin=${origin}&key=${process.env.EXPO_PUBLIC_API_KEY}`;

  const response = await httpClient.request({ method: "get", url: buildUrl });

  if (response.statusCode === HttpStatusCode.badRequest) {
    throw new Error("Bad Request", response.body);
  }

  return response.body;
};
