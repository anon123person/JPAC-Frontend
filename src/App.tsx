import MintCard from "./components/MintCard/MintCard";
import { PdfButton } from "./components/PdfButton/index.tsx";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header/Header.tsx";
import TextContainer from "./components/TextContainer/TextContainer.tsx";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header></Header>
        <MintCard></MintCard>
        <PdfButton></PdfButton>
        <TextContainer></TextContainer>
      </QueryClientProvider>
    </>
  );
}

export default App;
