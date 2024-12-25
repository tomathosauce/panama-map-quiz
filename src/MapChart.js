import React, { useState, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";

var datosExtraRegiones = {
  "Bocas del Toro": {
    posicionEtiqueta: [[9.264312, -82.40069]],
    offset: [-10, 0],
    alias: "Bocas\ndel\nToro",
  },
  "Naso Tjër Di": {
    posicionEtiqueta: [[9.310195, -82.90231]],
    offset: [12, -15],
    alias: "Naso\nTjër\nDi",
  },
  Chiriquí: { posicionEtiqueta: [[8.258282, -82.307707]], offset: [-15, -30] },
  Coclé: { posicionEtiqueta: [[8.523009, -80.429469]], offset: [0, 0] },
  Colón: { posicionEtiqueta: [[9.336071, -80.054984]], offset: [-10, 0] },
  Darién: { posicionEtiqueta: [[8.258383, -78.092023]], offset: [25, 25] },
  Emberá: {
    posicionEtiqueta: [
      [8.449746, -77.602311],
      [7.838691, -78.133175],
    ],
    offset: [0, -10],
    alias: "Emberá-\nWounaan",
  },
  Herrera: { posicionEtiqueta: [[7.868222, -80.726992]], offset: [2, 0] },
  "Kuna Yala": {
    posicionEtiqueta: [[9.359191, -78.162969]],
    offset: [10, 0],
    alias: "Guna Yala",
  },
  "Los Santos": { posicionEtiqueta: [[7.567553, -80.315908]], offset: [-3, 3] },
  "Ngöbe Buglé": {
    posicionEtiqueta: [[8.66489, -81.71555]],
    offset: [0, 5],
    alias: "Ngäbe-Buglé",
  },
  "Panamá Oeste": {
    posicionEtiqueta: [[8.791519, -79.795725]],
    offset: [-13, -18],
    alias: "Panamá\nOeste",
  },
  Panamá: { posicionEtiqueta: [[9.080153, -78.960335]], offset: [0, 0] },
  Veraguas: { posicionEtiqueta: [[8.115385, -81.116053]], offset: [0, 0] },
};

var provincias = Object.keys(datosExtraRegiones);

function generateGameState() {
  return Object.assign(
    {},
    ...Array.from(provincias, (p) => ({ [p]: { count: 0, correct: null } }))
  );
}

function getRandomElement(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

const colorCorrect = "#2ee87f";
const colorWrong = "#f74f66";
const colorHover = "#abdcff";

const MapChart = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentProvince, setCurrentProvince] = useState(null);
  const [provinceList, setProvinceList] = useState(provincias);
  const [gameState, setGameState] = useState(generateGameState());
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setTime(0);
  };

  const handleClick = (geoProps) => () => {
    var clicked = geoProps.name;
    var clickedCount = gameState[clicked].count;

    if (provinceList.length == 0) {
      setIsRunning(false);
      setIsFinished(true);
    }

    if (isRunning) {
      var clickedProvinceState = gameState[currentProvince];

      if (currentProvince == clicked) {
        if (clickedCount == 0) {
          setGameState({
            ...gameState,
            [currentProvince]: {
              count: clickedProvinceState + 1,
              correct: true,
            },
          });
        }
      } else {
        setGameState({
          ...gameState,
          [currentProvince]: {
            count: clickedProvinceState + 1,
            correct: false,
          },
        });
      }

      var province = getRandomElement(provinceList);
      var newProvinceList = provinceList.filter((p) => p != province);

      setCurrentProvince(province);
      setProvinceList(newProvinceList);
    }
  };

  const correctas = provincias.filter((p) => gameState[p].correct).length;

  return (
    <>
      {isRunning && (
        <>
          <h3>
            A ver, dónde queda{" "}
            <span style={{ fontStyle: "italic" }}>{currentProvince}</span>?
          </h3>
          <p>
            Puntuación actual = {correctas}/{provincias.length}
          </p>
          <p className="stopwatch-time">
            {hours}:{minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}:
            {milliseconds.toString().padStart(2, "0")}
          </p>
        </>
      )}

      {!isRunning && isFinished && (
        <>
          <p style={{ fontWeight: "bold" }}>
            Puntuacion final = {correctas}/{provincias.length} (
            {((correctas / provincias.length) * 100).toFixed(2)}%)
          </p>
          {correctas < 4 && (
            <p>
              <span style={{ fontStyle: "italic" }}>Fren</span>, ¿Estás seguro
              de que naciste aquí?
            </p>
          )}
          <p className="stopwatch-time">
            {hours}:{minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}:
            {milliseconds.toString().padStart(2, "0")}
          </p>
          {correctas == provincias.length && (
            <p style={{ fontWeight: "bold" }}>
              ¡Felicidades! Eres un verdadero Panameño 🇵🇦. Si eres extranjero
              podrás recoger tu carta de naturalización en 5 días hábiles 🫡
            </p>
          )}
        </>
      )}

      <div className="">
        {!isRunning && (
          <button
            className="custom-button"
            onClick={() => {
              startAndStop();
              if (isFinished) {
                setGameState(generateGameState());
                var province = getRandomElement(provincias);
                setProvinceList(provincias.filter((p) => p != province));
              } else {
                var province = getRandomElement(provinceList);
                setProvinceList(provinceList.filter((p) => p != province));
              }

              setCurrentProvince(province);
            }}
          >
            {isFinished ? "Empezar de nuevo" : "Empezar"}
          </button>
        )}
      </div>
      <ComposableMap
        projection="geoMercator"
        preserveAspectRatio="none"
        projectionConfig={{
          center: [-80, 8.57708],
          scale: 6000,
          // rotate: [0, 0, 0],
        }}
        height={300}
        width={800}
      >
        {/* <ZoomableGroup center={[9.08628, -78.9283]} zoom={1}> */}
        <Geographies geography={"features.json"}>
          {({ geographies }) =>
            geographies.map((geo) => {
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={handleClick(geo.properties)}
                  style={{
                    default: {
                      fill: isRunning
                        ? gameState[geo.properties.name].correct == null
                          ? "white"
                          : gameState[geo.properties.name].correct
                          ? colorCorrect
                          : colorWrong
                        : isFinished
                        ? gameState[geo.properties.name].correct == null
                          ? "white"
                          : gameState[geo.properties.name].correct
                          ? colorCorrect
                          : colorWrong
                        : "white",
                      outline: "none",
                    },
                    hover: {
                      fill:
                        gameState[geo.properties.name].correct == null
                          ? colorHover
                          : gameState[geo.properties.name].correct
                          ? colorCorrect
                          : colorWrong,
                      outline: "none",
                    },
                    // pressed: {
                    //   fill: "#072357",
                    //   outline: "none",
                    // },
                  }}
                  stroke="#a0a0a0"
                />
              );
            })
          }
        </Geographies>
        {Object.keys(datosExtraRegiones)
          .filter((p) => gameState[p].correct)
          .map((key) => {
            var region = datosExtraRegiones[key];
            var pos = region.posicionEtiqueta;
            var alias = region.alias || key;
            var offset = region.offset;
            var aliasDivisions = alias.split("\n");

            return pos.map((c, i) => {
              var coordinates = [c[1], c[0]];

              return (
                <Marker key={key + i} coordinates={coordinates}>
                  {/* <circle r={2} fill="#F00" stroke="#fff" strokeWidth={2} /> */}
                  <text
                    textAnchor="middle"
                    y={offset[1]}
                    x={offset[0]}
                    style={{
                      // fontFamily: "system-ui",
                      fill: "#000",
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    {aliasDivisions.length == 1 && <>{alias}</>}
                    {aliasDivisions.length > 1 && (
                      <>
                        {aliasDivisions.map((d) => {
                          return (
                            <tspan x={offset[0]} dy="1em">
                              {d}
                            </tspan>
                          );
                        })}
                      </>
                    )}
                  </text>
                </Marker>
              );
            });
          })}
        {/* </ZoomableGroup> */}
      </ComposableMap>
    </>
  );
};

export default MapChart;
