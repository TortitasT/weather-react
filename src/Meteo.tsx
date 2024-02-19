import Temperature from "@/components/temperature";
import { useQuery } from "react-query";
import useLatLon from "./hooks/useLatLon";
import { Forecast } from "./shared.types";
import { Skeleton } from "./components/ui/skeleton";

function Meteo() {
  const latlon = useLatLon();

  const { data } = useQuery(
    "forecast",
    async () => {
      const url = new URL("https://api.open-meteo.com/v1/forecast");

      url.searchParams.append("latitude", latlon.latLon!.lat.toString());
      url.searchParams.append("longitude", latlon.latLon!.lon.toString());
      url.searchParams.append("hourly", "temperature_2m");

      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json() as Promise<Forecast>;
    },
    {
      enabled: latlon.latLon !== null,
    }
  );

  return (
    <main className="p-2">
      <latlon.Modal />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Temperature forecast={data} />
        <Skeleton className="h-[250px] rounded-xl" />
        <Skeleton className="h-[250px] rounded-xl md:col-span-2" />
        <Skeleton className="h-[250px] rounded-xl" />
        <Skeleton className="h-[250px] rounded-xl" />
      </div>
    </main>
  );
}

export default Meteo;
