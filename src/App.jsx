import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Universe from "./components/Universe";
import LoadingPage from "./components/LoadingPage";

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            !isLoaded ? (
              <LoadingPage onLoaded={() => setIsLoaded(true)} />
            ) : (
              <Universe />
            )
          }
        />
        {/* Aggiungi altre rotte se necessario */}
      </Routes>
    </Router>
  );
}
