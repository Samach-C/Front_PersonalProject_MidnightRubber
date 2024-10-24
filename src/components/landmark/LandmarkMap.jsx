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
import tire from "../../assets/tire.png";

function LocationMarker({ setPosition, form, setForm, position }) {
  const map = useMapEvents({
    click: (e) => {
      console.log("Click", e.latlng);
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

// ใช้ useMapEvents เพื่อตรวจจับเหตุการณ์การคลิกบนแผนที่
// เมื่อคลิกจะ:
// อัปเดต position ด้วยค่าพิกัดที่คลิก
// ทำให้แผนที่ "บิน" ไปยังตำแหน่งที่คลิก (flyTo)
// อัปเดตฟอร์มด้วยค่าพิกัด (ละติจูดและลองจิจูด)
// ถ้า position ไม่มีค่า (null) จะไม่แสดง Marker บนแผนที่

export default function LandmarkMap({
  landmarks,
  setPosition,
  setForm,
  position,
  handleEdit,
  handleDelete,
  form,
  user,
  SearchTerm,
}) {
  const [myPosition, setMyPosition] = useState(null);
  const serviceIcon = L.icon({
    iconUrl: tire,
    iconSize: [25, 25],
  });
  // console.log(serviceIcon)

  // รับ props หลายตัวที่ถูกส่งเข้ามาเช่น landmarks, SearchTerm, user, และฟังก์ชันต่าง ๆ ที่จัดการการแก้ไข ลบ landmark
  // ใช้ useState เพื่อจัดการตำแหน่งปัจจุบัน (myPosition)
  // กำหนดไอคอน serviceIcon สำหรับ Marker บนแผนที่ โดยใช้รูปไอคอนจาก tire.png

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
              setMyPosition([13, 100]);
              map.setView([13, 100], 15);
            }
          }
        );
      } else {
        if (!myPosition) {
          setMyPosition([13, 100]);
          map.setView([13, 100], 15);
        }
      }
    }, [map, myPosition, setMyPosition]);

    return myPosition ? <Marker position={myPosition}></Marker> : null;
  };

  // ตรวจจับตำแหน่งปัจจุบันของผู้ใช้ด้วย navigator.geolocation
  // เมื่อได้ตำแหน่ง (latitude, longitude) จะ:
  // อัปเดต myPosition
  // ใช้ map.setView() เพื่อเลื่อนแผนที่ไปยังตำแหน่งปัจจุบันของผู้ใช้
  // ถ้าไม่สามารถหาตำแหน่งได้ จะใช้พิกัดเริ่มต้นเป็น [13, 100] 
  // แสดง Marker บนตำแหน่งปัจจุบันของผู้ใช้ถ้ามีข้อมูลใน myPosition

  let landmarksForMap = null;

  if (SearchTerm) {
    landmarksForMap = landmarks?.filter(
      (item) =>
        item.title &&
        item.title.toLowerCase().includes(SearchTerm.toLowerCase())
    );
  } else {
    landmarksForMap = [...landmarks];
  }

  // ถ้ามีคำค้นหา (SearchTerm) จะทำการกรองเฉพาะ landmark ที่มีชื่อ (title) ตรงกับคำค้นหานั้น
  // ถ้าไม่มีคำค้นหา จะใช้ข้อมูล landmark ทั้งหมด
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
            {landmarksForMap?.map((item, index) => (
              <Marker
                key={index}
                icon={serviceIcon}
                position={[item.lat, item.lng]}
              >
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
      
      {/* MyLocation: แสดงตำแหน่งปัจจุบันของผู้ใช้ */}
      <MyLocation myPosition={myPosition} setMyPosition={setMyPosition} /> 

      {/* LocationMarker: แสดง marker ตำแหน่งที่คลิกบนแผนที่ (และอัปเดตฟอร์ม) */}
      <LocationMarker
        position={position}
        setPosition={setPosition}
        form={form}
        setForm={setForm}
      />

      {/* CurrentPositionButton: ปุ่มที่อาจจะใช้สำหรับเลื่อนไปยังตำแหน่งปัจจุบันของผู้ใช้ */}
      <CurrentPositionButton />
    </MapContainer>
  );
}
