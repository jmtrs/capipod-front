import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import Header from "./components/Header.jsx";
import AppRoutes from "./routes/AppRoutes.jsx"

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Header />
        <AppLayout>
          <AppRoutes />
        </AppLayout>
      </Router>
    </ChakraProvider>
  );
}

function AppLayout({ children }) {
  return (
    <div
      style={{
        margin: "90px auto",
        marginX: "auto",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}

export default App;
