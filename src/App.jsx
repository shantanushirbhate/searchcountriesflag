import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

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
        console.log("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="container">
      <h1>Search Countries</h1>

      <input
        type="text"
        placeholder="Search for countries"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="searchInput"
      />

      {/* Cypress expects this class */}
      <div className="countryCard">
        {filteredCountries.map((country, index) => (
          <div key={index} className="card">
            <img src={country.png} alt={country.common} />
            <p>{country.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
}