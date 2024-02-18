import { useQuery, useQueryClient } from "react-query";
import useLatLon from "./hooks/useLatLon";

function Meteo() {
  const queryClient = useQueryClient();

  const latlon = useLatLon();

  return (
    <div>
      <latlon.Modal />
      <h1>Meteo</h1>
      <p>
        {latlon.latLon ? (
          <span>
            {latlon.latLon.lat}, {latlon.latLon.lon}
          </span>
        ) : (
          "Loading..."
        )}
      </p>
    </div>
  );
}

export default Meteo;
