import { createContext, useContext, useEffect, useState } from "react";
import * as PropTypes from "prop-types";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:8000";

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchCities() {
    setIsLoading(true);
    const res = await fetch(`${BASE_URL}/cities`);
    const data = await res.json();
    setCities(data);
    setIsLoading(false);
  }

  useEffect(function () {
    try {
      fetchCities();
    } catch (error) {
      setIsLoading(false);
    }
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
    const context = useContext(CitiesContext);

    if (context === undefined) {
        throw new Error("CitiesContext was used outside CitiesProvider!");
    }

    return context
}

CitiesProvider.propTypes = {
  children: PropTypes.node,
};

export { CitiesProvider, useCities };