import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import { GrLocation } from "react-icons/gr";


const MapComponent = () => {
  const initialPosition = [51.505, -0.09]; // Replace with your desired initial coordinates

  return (
    <MapContainer center={initialPosition} zoom={13} style={{ height: '400px', width: '100%' }}>
      {/* Add a tile layer */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Add a marker with a popup */}
      <Marker position={initialPosition}>
        <Popup>
          <p>Location</p>
        </Popup>
        <GrLocation />
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
