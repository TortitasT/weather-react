import { useQuery, useQueryClient } from "react-query";
import useLatLon from "./hooks/useLatLon";

function Meteo() {
  const queryClient = useQueryClient();

  const latlon = useLatLon();

  // const data = useQuery("meteo")

  return (
    <div>
      <latlon.Modal />
      <h1>Meteo</h1>
    </div>
  );
}

export default Meteo;
