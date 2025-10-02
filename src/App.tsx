import "./App.css";
import {Outlet} from 'react-router';
import Header from "@/components/header/Header";
import { Separator } from "@/components/ui/Separator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header/>
        <Separator className="sticky top-19"/>
        <main className="max-w-4xl mx-auto px-4 pb-8">
            <Outlet/>
        </main>
      </QueryClientProvider>
    </>
  );
}

export default App;
