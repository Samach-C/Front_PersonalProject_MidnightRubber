import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  LayersControl,
  LayerGroup,
  Tooltip,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import CurrentPositionButton from "./CurrentPositionButton";
import LandmarkPopup from "./LabdmarkPopup";
import tire from "../../assets/tire.png"

function LocationMarker({ setPosition, form, setForm, position }) {
  const map = useMapEvents({
    click: (e) => {
      console.log("Click", e.latlng)
      setPosition(e.latlng);
      map.flyTo(e.latlng, 18);
      setForm((prevForm) => ({
        ...prevForm,
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      }));
    },
  });
  return position === null ? null : <Marker position={position}></Marker>;
}

export default function LandmarkMap({
  landmarks,
  setPosition,
  setForm,
  position,
  handleEdit,
  handleDelete,
  form,
  user,
}) {
  const [myPosition, setMyPosition] = useState(null);
  const serviceIcon = L.icon({
    iconUrl: tire,
    iconSize: [25, 25],
  });
    // console.log(serviceIcon)

  const MyLocation = ({ myPosition, setMyPosition }) => {
    const map = useMap();

    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            if (
              !myPosition ||
              myPosition[0] !== latitude ||
              myPosition[1] !== longitude
            ) {
              setMyPosition([latitude, longitude]);
              map.setView([latitude, longitude], 15);
            }
          },
          (err) => {
            console.error(err);
            if (!myPosition) {
              setMyPosition([51.505, -0.09]);
              map.setView([51.505, -0.09], 15);
            }
          }
        );
      } else {
        if (!myPosition) {
          setMyPosition([51.505, -0.09]);
          map.setView([51.505, -0.09], 15);
        }
      }
    }, [map, myPosition, setMyPosition]);

    return myPosition ? <Marker position={myPosition}></Marker> : null;
  };

  return (
    <MapContainer
      center={[13, 100]}
      zoom={6}
      style={{ height: "100vh", width: "100vw", zIndex: "0" }}
    >
      <LayersControl>
        <LayersControl.BaseLayer name="แผนที่ 1" checked>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="แผนที่ 2">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.png"
          />
        </LayersControl.BaseLayer>

        <LayersControl.Overlay name="Landmark" checked>
          <LayerGroup>
            {landmarks?.map((item, index) => (
              <Marker key={index} icon={serviceIcon} position={[item.lat, item.lng]}>
                {/* เรียกใช้ LandmarkPopup ที่แยกออกมา */}
                <LandmarkPopup
                  item={item}
                  form={form}
                  setForm={setForm}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  user={user}
                />
                <Tooltip>{item.title}</Tooltip>
              </Marker>
            ))}
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>

      <MyLocation myPosition={myPosition} setMyPosition={setMyPosition} />
      <LocationMarker position={position} setPosition={setPosition} form={form} setForm={setForm} />
      <CurrentPositionButton />
    </MapContainer>
  );
}