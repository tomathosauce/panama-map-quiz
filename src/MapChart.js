import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  ZoomableGroup,
} from "react-simple-maps";
var geo = "/features.json";
var geo1 =
  "https://services2.arcgis.com/HRY6x8qt5qjGnAA9/arcgis/rest/services/Corregimientos/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";
var geo2 = "https://simplemaps.com/static/svg/country/pa/admin1/pa.json";
var geo3 = "/features2.json";
const MapChart = () => {
  const handleClick = (geo) => () => {
    console.log(geo);
  };
  return (
    <ComposableMap
      projection="geoMercator"
      preserveAspectRatio="none"
      projectionConfig={{
        center: [-80, 8.57708],
        scale: 6000,
        // rotate: [0, 0, 0],
      }}
    >
      {/* <ZoomableGroup center={[9.08628, -78.9283]} zoom={1}> */}
      <Geographies geography={geo3}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              onClick={handleClick(geo.properties)}
              style={{
                default: {
                  fill: "#EEE",
                  outline: "none",
                },
                hover: {
                  fill: "#F53",
                  outline: "none",
                },
                pressed: {
                  fill: "#E42",
                  outline: "none",
                },
              }}
            />
          ))
        }
      </Geographies>
      {/* </ZoomableGroup> */}
    </ComposableMap>
  );
};

export default MapChart;
