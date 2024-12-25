import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import MapChart from "./MapChart";

function App() {
  return (
    <div className="app">
      <h1>Quiz de divisiones administrativas de Panamá</h1>
      <MapChart />
      <p style={{ marginTop: "3rem" }}>
        Hecho con 💖 por{" "}
        <a
          href="https://github.com/tomathosauce/"
          target="_blank"
          className="custom-link"
        >
          tomathosauce
        </a>{" "}
        con datos de{" "}
        <a
          href="https://simplemaps.com/gis/country/pa"
          target="_blank"
          className="custom-link"
        >
          SimpleMaps.com
        </a>
      </p>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
