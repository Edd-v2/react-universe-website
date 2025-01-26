import React, { useState } from "react";
import LoadingPage from "./components/LoadingPage";

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded ? (
        <LoadingPage onLoaded={() => setIsLoaded(true)} />
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-black">
          <h1 className="text-white text-4xl font-bold">Welcome to the Universe!</h1>
        </div>
      )}
    </>
  );
}
