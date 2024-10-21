import React, { useState } from "react";
import { Popup } from "react-leaflet";

export default function LandmarkPopup({
  item,
  form,
  setForm,
  handleEdit,
  handleDelete,
  user,
}) {
  const [isEdit, setIsEdit] = useState(false);

  const handleButtonEdit = (e) => {
    e.preventDefault();
    e.stopPropagation() // หยุดการแพร่กระจายเหตุการณ์
    setIsEdit(true);
    setForm({
      title: item?.title|| "",
      detail: item?.detail || "",
      lat: item?.lat || "",
      lng: item?.lng || "",
    });
  };

  const handleCancelEdit = (e) => {
    e.preventDefault();
    e.stopPropagation() // หยุดการแพร่กระจายเหตุการณ์
    setIsEdit(false);
    setForm({ title: "", detail: "", lat: "", lng: "" }); // ล้างค่าในฟอร์ม
  };

  const handlePopupClose = (e) => {
console.log("11111",e)

    setIsEdit(false)
    setForm({title: "", detail: "", lat: "", lng: ""})
  }

  if(!item) return null // ตรวจสอบว่า item มีค่า

  return (
    <Popup>
      {isEdit ? (
        <form
          className="flex flex-col gap-1"
          onSubmit={(e) => {
            e.preventDefault()
            handleEdit(item?.id, e);
            setIsEdit(false);
          }}
        >
          <p className="text-blue-300">Title:</p>
          <input
            className="border h-10 text-xm"
            type="text"
            name="title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <p className="text-orange-300">Detail:</p>
          <input
            className="border h-10 text-xm"
            type="text"
            name="detail"
            value={form.detail}
            onChange={(e) => setForm({ ...form, detail: e.target.value })}
          />
          <button className="btn btn-success">Save</button>
          <button className="btn btn-secondary" onClick={handleCancelEdit}>
            Cancel
          </button>
        </form>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex flex-col border border-black text-xs">
            <div className="text-blue-300">Title:</div>
            <div className="text-lg">{item?.title}</div>
          </div>
          <div className="flex flex-col border border-black text-xs">
            <div className="text-orange-300">Detail:</div>
            <div className="text-lg">{item?.detail}</div>
          </div>

          <div className="text-xs text-gray-500 flex">
            Posted by:{" "}
            <div className="text-blue-600">
              {item?.user?.firstName || "Unknown User"}
            </div>
          </div>

          {(user?.id === item?.userId || user?.role === "ADMIN") && (
            <>
              <button
                className="btn btn-warning"
                onClick={handleButtonEdit}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(item?.id)}
              >
                Delete
              </button>
            </>
          )}
        </div>
      )}
    </Popup>
  );
}