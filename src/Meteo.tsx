import { useQuery, useQueryClient } from "react-query";
import useLatLon from "./hooks/useLatLon";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

      {/* <Dialog open={true}> */}
      {/*   <DialogContent> */}
      {/*     <DialogHeader> */}
      {/*       <DialogTitle>Are you absolutely sure?</DialogTitle> */}
      {/*       <DialogDescription> */}
      {/*         This action cannot be undone. This will permanently delete your */}
      {/*         account and remove your data from our servers. */}
      {/*       </DialogDescription> */}
      {/*     </DialogHeader> */}
      {/*   </DialogContent> */}
      {/* </Dialog> */}
    </div>
  );
}

export default Meteo;
