import { ImageProps, TouchableOpacityProps } from "react-native";

export interface ButtonProps extends TouchableOpacityProps {
  onPress: () => void;
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "success" | "outline";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  className?: string;
}

export interface OnboardingProps {
  onboarding: {
    description: string;
    image: ImageProps;
    title: string;
  }[];
}

export type HttpRequest = {
  url: string;
  method: HtppMethod;
  body?: any;
  headers?: any;
};

export interface HttpClient<R = any> {
  request: (data: HttpRequest) => Promise<HttpResponse<R>>;
}

export type HtppMethod = "post" | "get" | "put" | "delete";

export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500,
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode;
  body?: T;
};

export interface DirectionCoordsProps {
  lat: number;
  lng: number;
}

export interface DirectionProps {
  routes: {
    legs: [
      end_location: {
        lat: number;
        lng: number;
      }
    ];
    overview_polyline: {
      points: string;
    };
  }[];
}
