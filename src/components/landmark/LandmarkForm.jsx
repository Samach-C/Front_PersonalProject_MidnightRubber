import React, { useState } from "react";

export default function LandmarkForm({ position, form, setForm, hdlSubmit }) {
  const hdlOnchange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  return (
    <form onSubmit={hdlSubmit} className="flex flex-col gap-3 p-4 pt-10">
      <p>Title :</p>
      <textarea
        name="title"
        onChange={hdlOnchange}
        // value={form.title}
        type="title"
        className="textarea textarea-bordered"
        placeholder="Store Name"
      ></textarea>

      <p>Detail :</p>
      <textarea
        name="detail"
        onChange={hdlOnchange}
        // value={form.detail}
        type="detail"
        className="textarea textarea-bordered"
        placeholder="Tel & Detail "
      ></textarea>

      <p>Latitude: {position?.lat.toFixed(2)}</p>
      <p>Longitude: {position?.lng.toFixed(2)}</p>
      <button className="btn btn-secondary text-xl text-white">Submit</button>
    </form>
  );
}