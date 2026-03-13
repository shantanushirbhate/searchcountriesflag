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
        console.log("error in fetching flag", error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}> Search Countries</h1>

      <input
        type="text"
        value={search}
        placeholder="Search for countries..."
        onChange={(e) => setSearch(e.target.value)}
        style={styles.input}
      />

      <div style={styles.grid}>
        {filteredCountries.map((country, index) => (
          <div key={index} style={styles.card}>
            <img src={country.png} alt={country.common} style={styles.flag} />
            <p style={styles.name}>{country.common}</p>
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

  title: {
    marginBottom: "20px",
  },

  input: {
    padding: "10px",
    width: "60%",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "30px",
    fontSize: "16px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(160px,1fr))",
    gap: "20px",
  },

  card: {
    border: "1px solid #eee",
    borderRadius: "10px",
    padding: "15px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    transition: "0.3s",
  },

  flag: {
    width: "80px",
    height: "50px",
    objectFit: "cover",
  },

  name: {
    marginTop: "10px",
    fontWeight: "bold",
  },
};