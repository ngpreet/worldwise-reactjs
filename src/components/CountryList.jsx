import * as PropTypes from "prop-types";

import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import Message from "./Message";
import styles from "./CountryList.module.css";

function CountryList({ cities, isLoading }) {
  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length) {
    return (
      <Message message="Add your first city by clicking city on the map" />
    );
  }

  const countries = cities.reduce((arr, city) => {
    if (arr.map((el) => el.country).includes(city.country)) {
      return arr;
    } else {
      return [...arr, { country: city.country, emoji: city.emoji }];
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

CountryList.propTypes = {
  cities: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default CountryList;