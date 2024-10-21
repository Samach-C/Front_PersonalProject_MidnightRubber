import React, { useEffect, useState } from "react";
import axios from "axios";
import useUserStore from "../stores/userStore";
import useLandmarkStore from "../stores/landmarkStore";
import LandmarkForm from "./landmark/LandmarkForm";
import LandmarkMap from "./landmark/LandmarkMap";

export default function MainMap() {
  const [position, setPosition] = useState(null);
  const token = useUserStore((state) => state.token);
  const user = useUserStore((state) => state.user);
  const landmarks = useLandmarkStore((state) => state.landmarks);
  const fetchLandmarks = useLandmarkStore((state) => state.fetchLandmarks);
  const updateLandmark = useLandmarkStore((state) => state.updateLandmark);
  const deleteLandmark = useLandmarkStore((state) => state.deleteLandmark);

  
  const [form, setForm] = useState({ title: "", detail: "", lat: "", lng: "" });

  useEffect(() => {
    fetchLandmarks();
  }, [fetchLandmarks]);

  const hdlSubmit = async (e) => {
    e.preventDefault();
    // console.log(form)
    try {
      const resp = await axios.post("http://localhost:5588/landmark", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (resp.status === 200) {
        setForm({ title: "", detail: "", lat: "", lng: "" });
        setPosition(null);
        fetchLandmarks();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async (id, e) => {
    // console.log("Click")
    e.preventDefault();
    const landmarkToEdit = landmarks.find((item) => item.id === id);
    if(landmarkToEdit.userId !== user?.id && user?.role !== "ADMIN") {
      alert("You do not have permission to edit this landmark.")
      return
    }
    setForm({
      title: landmarkToEdit.title,
      detail: landmarkToEdit.detail,
    });
    try {
      await updateLandmark(token, id, form);
      // setEditId(null);
      setForm({ title: "", detail: "", lat: "", lng: "" });
      fetchLandmarks();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this landmark?"
    );
    if (confirmed) {
      try {
        await deleteLandmark(token, id);
        fetchLandmarks();
      } catch (err) {
        console.error("Error deleting landmark:", err);
      }
    }
  };
  return (
    <>
      {user ? (
        <div className="flex justify-center mt-20 h-[100px] w-[100vw]">
          <div className="bg-slate-400 h-[100vh]">
            <LandmarkForm
              position={position}
              form={form}
              setForm={setForm}
              hdlSubmit={hdlSubmit}
            />
          </div>
          <LandmarkMap
            landmarks={landmarks}
            setPosition={setPosition}
            setForm={setForm}
            position={position}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            form={form}
            user={user}
          />
        </div>
      ) : (
        <div className="flex justify-center mt-20 h-[100px] w-[100vw]">
          <LandmarkMap
            landmarks={landmarks}
            setPosition={setPosition}
            setForm={setForm}
            position={position}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            form={form}
            user={user}
          />
        </div>
      )}
    </>
  );
}