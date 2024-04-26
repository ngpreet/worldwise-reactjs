import { createContext, useContext, useEffect, useState } from "react";
import * as PropTypes from "prop-types";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:8000";

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

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

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
      });
      const data = await res.json();
      setCities((cities) => [data, ...cities]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
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

  return context;
}

CitiesProvider.propTypes = {
  children: PropTypes.node,
};

export { CitiesProvider, useCities };
