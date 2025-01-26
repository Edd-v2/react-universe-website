import React, { useState } from "react";
import LoadingPage from "./components/LoadingPage";
import Universe from "./components/Universe";  // Make sure the path is correct

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded ? (
        <LoadingPage onLoaded={() => setIsLoaded(true)} />
      ) : (
        <Universe />
      )}
    </>
  );
}
