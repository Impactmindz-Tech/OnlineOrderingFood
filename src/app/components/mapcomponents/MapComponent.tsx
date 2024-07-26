import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
  iconUrl: "/public/locate.jpg",
  iconSize: [38, 38],
});

// Fix default icon issues with Next.js and Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const position = [51.505, -0.09];

function RecentCenterView(props) {
  const { selectPosition } = props;
  const map = useMap();

  useEffect(() => {
    if (selectPosition) {
      map.setView(L.latLng(selectPosition?.lat, selectPosition?.lon), map.getZoom(), {
        animate: true,
      });
    }
  }, [selectPosition, map]);

  return null;
}

const MapComponent = (props) => {
  const { selectPosition } = props;
  const locationSelection = selectPosition ? [selectPosition?.lat, selectPosition?.lon] : position;

  return (
    <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=eA3MBleCC9aTtUBJHL6C"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {selectPosition && (
        <Marker position={locationSelection} icon={icon}>
          <Popup>You are here</Popup>
        </Marker>
      )}
      <RecentCenterView selectPosition={selectPosition} />
    </MapContainer>
  );
};

export default MapComponent;
