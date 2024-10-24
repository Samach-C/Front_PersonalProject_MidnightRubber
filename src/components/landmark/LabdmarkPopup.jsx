import React, { useState } from "react";
import { Popup } from "react-leaflet";
import { NavigateIcon } from "../../icons";

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
    e.stopPropagation();
    setIsEdit(true);
    setForm({
      title: item?.title || "",
      detail: item?.detail || "",
    });
  };

  const handleCancelEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEdit(false);
    setForm({ title: "", detail: "" });
  };

  const handleNavigate = () => {
    if (item?.lat && item?.lng) {
      const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${item.lat},${item.lng}`;
      window.open(googleMapsUrl, "_blank");
    }
  };

  if (!item) return null;

  return (
    <Popup>
      <div className="p-4 bg-white rounded-lg shadow-lg w-70 space-y-4">
        {isEdit ? (
          <form
            className="flex flex-col gap-3 bg-blue-50 p-4 rounded-lg shadow-md"
            onSubmit={(e) => {
              e.preventDefault();
              handleEdit(item?.id, e);
              setIsEdit(false);
            }}
          >
            <h3 className="text-lg font-semibold text-center text-blue-600">
              Edit Landmark
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title:
              </label>
              <input
                className="border border-gray-300 rounded h-10 p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                type="text"
                name="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Detail:
              </label>
              <input
                className="border border-gray-300 rounded h-10 p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                type="text"
                name="detail"
                value={form.detail}
                onChange={(e) => setForm({ ...form, detail: e.target.value })}
              />
            </div>
            <div className="flex justify-between">
              <button className="btn btn-success">Save</button>
              <button className="btn btn-secondary" onClick={handleCancelEdit}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-center text-blue-600">
              {item?.title}
            </h3>
            <p className="text-gray-600">{item?.detail}</p>
            <div className="text-xs text-gray-500">
              Posted by:{" "}
              <span className="text-blue-600">
                {item?.user?.firstName || "Unknown User"}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {/* Navigation button for Google Maps */}
              {item?.lat && item?.lng && (
                <button
                  className="btn btn-primary btn-sm flex items-center justify-center space-x-1 w-[50px]"
                  onClick={handleNavigate}
                >
                  <NavigateIcon className="w-5 h-5" />
                  {/* <span>Navigate</span> */}
                </button>
              )}

              {/* Only users with permissions can edit and delete */}
              {(user?.id === item?.userId || user?.role === "ADMIN") && (
                <div className="flex gap-2">
                  <button
                    className="btn btn-warning btn-sm flex-1"
                    onClick={handleButtonEdit}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm flex-1"
                    onClick={() => handleDelete(item?.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Popup>
  );
}
