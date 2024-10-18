import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  LayerGroup,
  Tooltip,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import CurrentPositionButton from "./CurrentPositionButton";

function LocationMarker({ setPosition, form, setForm, position }) {
  const map = useMapEvents({
    click: (e) => {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 18);
      setForm({
        ...form,
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
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
  editId,
  setEditId,
  form,
  user,
}) {

  // console.log('setForm:', setForm);
  const [myPosition, setMyPosition] = useState(null);
  const serviceIcon = L.icon({
    iconUrl:
      "https://www.freeiconspng.com/uploads/simple-car-wheel-tire-rims-side-view-by-qubodup--just-a-wheel-side--15.png",
    iconSize: [25, 25],
  });

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
              <Marker
                key={index}
                icon={serviceIcon}
                position={[item.lat, item.lng]}
              >
                <Popup>
                  {editId === item.id ? (
                    user?.id === item.userId || user?.role === "ADMIN"? (
                    <form
                      className="flex flex-col gap-1"
                      onSubmit={(e) => handleEdit(item.id, e)}
                    >
                      <p className="text-blue-300">Title:</p>
                      <input
                        className="border h-10 text-xm"
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={(e) =>
                          setForm({ ...form, title: e.target.value })
                        }
                      />
                      <p className="text-orange-300">Detail:</p>
                      <input
                        className="border h-10 text-xm"
                        type="text"
                        name="detail"
                        value={form.detail}
                        onChange={(e) =>
                          setForm({ ...form, detail: e.target.value })
                        }
                      />
                      <button className="btn btn-success">Save</button>
                      <button
                        className="btn btn-secondary"
                        onClick={(e) => {
                          e.preventDefault()
                          setEditId(null)
                          setForm({ title: "", detail: "", lat: "", lng: "" }); // เคลียร์ข้อมูลใน form
                        }}
                      >
                        Cancel
                      </button>
                    </form>
                  ):(
                    <p>You do not have permission to edit this landmark.</p>
                  ) 
                ): (
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col border border-black text-xs">
                        <div className="text-blue-300">Title:</div>
                        <div className="text-lg">{item.title}</div>
                      </div>
                      <div className="flex flex-col border border-black text-xs">
                        <div className="text-orange-300">Detail:</div>
                        <div className="text-lg">{item.detail}</div>
                      </div>

                      <div className="text-xs text-gray-500 flex">
                        Posted by:{" "}
                        <div className="text-blue-600">
                          {item.user?.firstName || "Unknown User"}
                        </div>
                      </div>

                      {(user?.id === item.userId || user?.role === "ADMIN") && (
                        <>
                          <button
                            className="btn btn-warning"
                            onClick={() => {
                              setEditId(item.id)
                              setForm({ // ตั้งค่า form ด้วยข้อมูล landmark ที่จะแก้ไข
                                title: item.title,
                                detail: item.detail,
                                lat: item.lat,
                                lng: item.lng,
                              });
                            } 
                            }
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </Popup>
                <Tooltip>{item.title}</Tooltip>
              </Marker>
            ))}
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>

      <MyLocation myPosition={myPosition} setMyPosition={setMyPosition} />

      <LocationMarker position={position} setPosition={setPosition} form={form} setForm={setForm} />

      {/* เรียกใช้ CurrentPositionButton */}
      <CurrentPositionButton />
    </MapContainer>
  );
}