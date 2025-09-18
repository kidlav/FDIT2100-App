import "./App.css";
import Header from "@/components/header/Header";
import { Separator } from "@/components/ui/Separator";
import LatestPosts from "@/components/latestPosts/LatestPosts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Separator />
        <LatestPosts />
      </QueryClientProvider>
    </>
  );
}

export default App;
