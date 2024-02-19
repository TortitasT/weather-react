import { Forecast } from "@/shared.types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Skeleton } from "./ui/skeleton";

function Temperature({ forecast }: { forecast: Forecast | undefined }) {
  if (!forecast) {
    return <Skeleton className="h-[125px] w-[250px] rounded-xl" />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Temperature</CardTitle>
        <CardDescription>
          Forecast for the next hour 2m above ground.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <span className="text-6xl">{forecast.hourly.temperature_2m[0]}</span>
        <span className="text-2xl">{forecast.hourly_units.temperature_2m}</span>
      </CardContent>
    </Card>
  );
}

export default Temperature;
