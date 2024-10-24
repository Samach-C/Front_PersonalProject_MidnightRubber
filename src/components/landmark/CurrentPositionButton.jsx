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

  // ฟังก์ชันนี้จะทำงานเมื่อผู้ใช้กดปุ่มเพื่อค้นหาตำแหน่งปัจจุบัน.
  // ใช้ navigator.geolocation เพื่อตรวจสอบว่าฟังก์ชันตำแหน่ง (geolocation) รองรับในเบราว์เซอร์หรือไม่:
  // ถ้ารองรับ: เรียก getCurrentPosition เพื่อนำตำแหน่งปัจจุบัน (ละติจูดและลองจิจูด) ของผู้ใช้.
  // หากสำเร็จ: ใช้ map.flyTo([lat, lon], 16) เพื่อทำให้แผนที่เลื่อนไปยังตำแหน่งนั้น 
  // หากล้มเหลว: แสดงข้อความแจ้งเตือน 
  // ถ้าไม่รองรับ: แสดงข้อความแจ้งเตือน 

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
