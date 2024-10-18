import React from "react";
import { useMap } from "react-leaflet";
import * as L from "leaflet";

const CurrentPositionButton = () => {
  const map = useMap();

  const handleButtonClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          map.flyTo([lat, lon], 16); // Pan to user's current position
        },
        () => {
          alert("Unable to retrieve your location");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  return (
    <button
      className="fixed bottom-5 right-5 border-4 bg-slate-100 bg-InputBg text-InputText text-base font-bold font-bebas px-4 py-2 rounded-full tracking-widest hover:bg-MainOrange hover:text-InputText transition z-[401]"
      onClick={handleButtonClick}
    >
      📍 Return Position
    </button>
  );
};

export default CurrentPositionButton;
