import React, { useState } from 'react';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';
const { DrawingManager } = require("react-google-maps/lib/components/drawing/DrawingManager");

const Map = (props) => {
  const [initLocation, setInitLocation] = useState({
    lat: 21.017374,
    lng: 105.859521,
  });

  const [point, setPoint] = useState(null);

  const [location, setLocation] = useState()

  const changeLocation = (e) => {
    setLocation({
      latitude: e.latLng.lat(),
      longtitude: e.latLng.lng()
    })
  }

  console.log("location", location);

  return (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={initLocation} // Hiển thị ra vùng trung tâm ban đầu
      onClick={changeLocation}
    >
      {location && <Marker
        position={{ lat: location.latitude, lng: location.longtitude }}
        onClick={() => setPoint({
          latitude: parseFloat(location.latitude),
          longtitude: parseFloat(location.longtitude)
        })}
      />}

      {point && <InfoWindow
          position={{
            lat: point.latitude,
            lng: point.longtitude,
          }}
          onCloseClick={() => setPoint(null)}
        ><div>
            <h3>Tọa độ </h3>
            <div style={{ display: "flex" }}>
              <b>Kinh độ: </b>
              <p> {point.longtitude}</p>
            </div>
          
            <div style={{ display: "flex" }}>
              <b>Vĩ độ: </b>
              <p> {point.latitude}</p>
            </div>
          </div>
        </InfoWindow>}
    </GoogleMap>
  );
};

const WrappedMap = withScriptjs(withGoogleMap(Map));
export default WrappedMap;
