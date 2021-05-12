import React, { useState } from 'react';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
} from 'react-google-maps';

const Map = (props) => {
  const [initLocation, setInitLocation] = useState({
    lat: 21.017374,
    lng: 105.859521,
  });

  return (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={initLocation} // Hiển thị ra vùng trung tâm ban đầu
    >
    </GoogleMap>
  );
};

const WrappedMap = withScriptjs(withGoogleMap(Map));
export default WrappedMap;
