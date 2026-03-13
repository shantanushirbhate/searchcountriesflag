import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  const filteredCountries = countries.filter((country) =>
    country.common.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
        );
        setCountries(response.data);
      } catch (error) {
        console.log("Error fetching countries", error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div style={styles.container}>
      <h1>Search Countries</h1>

      <input
        type="text"
        placeholder="Search for countries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.input}
      />

      {/* Cypress expects this class */}
      <div className="countryCard" style={styles.flexContainer}>
        {filteredCountries.map((country, index) => (
          <div key={index} style={styles.card}>
            <img src={country.png} alt={country.common} style={styles.flag} />
            <p>{country.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "40px auto",
    textAlign: "center",
    fontFamily: "Arial",
  },

  input: {
    padding: "10px",
    width: "60%",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "30px",
  },

  flexContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
  },

  card: {
    width: "150px",
    border: "1px solid #eee",
    borderRadius: "10px",
    padding: "15px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    textAlign: "center",
  },

  flag: {
    width: "80px",
    height: "50px",
    objectFit: "cover",
  },
};