import React, { useState } from "react";

export default function LandmarkForm({ position, form, setForm, hdlSubmit }) {
  const hdlOnchange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={hdlSubmit} className="bg-slate-400 h-full rounded-lg shadow-lg p-6 space-y-4">
      <h2 className="text-2xl font-semibold text-center text-blue-600">Add Landmark</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Title:</label>
        <textarea
          name="title"
          onChange={hdlOnchange}
          value={form.title}
          className="textarea textarea-bordered w-full h-24 p-2 mt-1 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          placeholder="Store Name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Detail:</label>
        <textarea
          name="detail"
          onChange={hdlOnchange}
          value={form.detail}
          className="textarea textarea-bordered w-full h-24 p-2 mt-1 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          placeholder="Tel & Detail"
        />
      </div>

      <div className="flex justify-between text-gray-500 text-sm">
        <p>Latitude: <span className="font-semibold text-gray-800">{position?.lat.toFixed(2)}</span></p>
        <p>Longitude: <span className="font-semibold text-gray-800">{position?.lng.toFixed(2)}</span></p>
      </div>

      <button className="btn btn-secondary w-full text-xl text-white rounded-md transition duration-300 hover:bg-blue-600">
        Submit
      </button>
    </form>
  );
}
