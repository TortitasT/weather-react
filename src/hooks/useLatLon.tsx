import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LatLon, loadLatLonFromGeolocation } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { z } from "zod";

const formSchema = z.object({
  country: z.string(),
  city: z.string(),
});

export default function useLatLon() {
  const [open, setOpen] = useState(false);
  const [latLon, setLatLon] = useState<LatLon | null>(null);

  async function load() {
    if (latLon || open) return;

    try {
      const latLon = await loadLatLonFromGeolocation();
      console.log(latLon);
      setLatLon(latLon);
    } catch (error) {
      console.error(error);
      setOpen(true);
    }
  }

  load();

  return {
    Modal: () => {
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          country: "Spain",
          city: "Benidorm",
        },
      });

      const {
        data: geocodingData,
        refetch: geocodingRefresh,
        isLoading: geocodingIsLoading,
        isError: geocodingIsError,
      } = useQuery(
        "geocoding",
        async () => {
          const { country, city } = form.getValues();

          const url = new URL("https://nominatim.openstreetmap.org/search");
          url.searchParams.append("country", country);
          url.searchParams.append("city", city);
          url.searchParams.append("format", "json");

          const result = await fetch(url.toString()).then((res) => res.json());
          return result;
        },
        {
          enabled: false,
        }
      );

      useEffect(() => {
        if (geocodingData && geocodingData.length > 0 && !geocodingIsError) {
          const [first] = geocodingData;
          setLatLon({
            lat: parseFloat(first.lat),
            lon: parseFloat(first.lon),
          });
          setOpen(false);
        }
      }, [geocodingData, geocodingIsError]);

      const onSubmit = async () => {
        await geocodingRefresh();
      };

      return (
        <Dialog open={open}>
          <DialogContent
            onInteractOutside={(e) => {
              e.preventDefault();
            }}
          >
            <DialogHeader>
              <DialogTitle>
                Parece que no podemos obtener tu localización
              </DialogTitle>
              <DialogDescription>
                Por favor, revisa que tu navegador tenga activada la
                geolocalización, o bien, ingresa tu localización manualmente.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pais</FormLabel>
                      <FormControl>
                        <Input placeholder="Spain" {...field} />
                      </FormControl>
                      <FormDescription>
                        El país donde te encuentras
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ciudad</FormLabel>
                      <FormControl>
                        <Input placeholder="Benidorm" {...field} />
                      </FormControl>
                      <FormDescription>
                        La ciudad donde te encuentras
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-2 justify-end">
                  <Button type="submit" disabled={geocodingIsLoading}>
                    Guardar
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      );
    },

    latLon,
  };
}
