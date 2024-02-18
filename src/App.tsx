import { QueryClient, QueryClientProvider } from "react-query";
import Meteo from "./Meteo";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Meteo />
    </QueryClientProvider>
  );
}

export default App;
