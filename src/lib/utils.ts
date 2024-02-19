import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const GET_CURRENT_POSITION_OPTIONS = {
  enableHighAccuracy: false,
  timeout: 10000,
  maximumAge: Infinity,
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type LatLon = {
  lat: number;
  lon: number;
};

export async function loadLatLonFromGeolocation(): Promise<LatLon> {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Position");
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        reject,
        GET_CURRENT_POSITION_OPTIONS
      );
    } else {
      reject("Geolocation is not supported by this browser.");
    }
  });
}
