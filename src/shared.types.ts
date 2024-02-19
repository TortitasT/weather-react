export interface Forecast {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: ForecastHourlyUnits;
  hourly: ForecastHourly;
}
interface ForecastHourly {
  time: string[];
  temperature_2m: number[];
}
interface ForecastHourlyUnits {
  time: string;
  temperature_2m: string;
}
