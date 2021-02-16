import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Marker as LeafletMarker, icon } from 'leaflet'
import useSwr from "swr";

import 'leaflet/dist/leaflet.css'


import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

const fetcher = (...args) => fetch(...args).then(response => response.json());

LeafletMarker.prototype.options.icon = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
}); 


const App = () => {
  const position = {
    lat: -0.3411303,
    lng: -78.5490604
  }

  const url =
    "http://192.168.10.128:3030/donadores";
  const { data, error } = useSwr(url, fetcher);
  const mapas = data && !error ? data : [];
  const [activeMap, setActiveMap] = React.useState(null);

  return (
    <>
      <MapContainer center={position} zoom={13} style={{height: '400px'}}>
      <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
        {mapas.map(location => (
        <Marker
          key={location.id}
          position={[location.latitude, location.longitude]}
          onClick={() => {
            setActiveMap(location);
          }}
          
        />
        
      ))}

      {activeMap && (
        <Popup
          position={[
            activeMap.latitude,
            activeMap.longitude
          ]}
          onClose={() => {
            setActiveMap(null);
          }}
        >
          <div>
            <h2>{activeMap.nombre}</h2>
          </div>
          
        </Popup>
      )}
      </MapContainer>
    </>
  )
}
export default App;