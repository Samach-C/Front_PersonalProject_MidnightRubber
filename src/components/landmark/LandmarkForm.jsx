import React, { useState } from "react";

export default function LandmarkForm({ position, form, setForm, hdlSubmit }) {
  const hdlOnchange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ใช้สำหรับจัดการการเปลี่ยนแปลงของข้อมูลในฟอร์ม
  // ฟังก์ชันนี้จะอัปเดตค่าฟิลด์ที่ถูกเปลี่ยน โดยใช้ชื่อของ input (เช่น title, detail) เป็น key และค่าที่ผู้ใช้กรอกเป็น value
  // ค่าของ form จะถูกกระจายด้วย ...form เพื่อรักษาค่าฟิลด์อื่น ๆ ในฟอร์ม


  return (
    <form onSubmit={hdlSubmit} className="flex flex-col gap-3 p-4 pt-10">
      <p>Title :</p>
      <textarea
        name="title"
        onChange={hdlOnchange}
        value={form.title}
        type="title"
        className="textarea textarea-bordered"
        placeholder="Store Name"
      ></textarea>

      <p>Detail :</p>
      <textarea
        name="detail"
        onChange={hdlOnchange}
        value={form.detail}
        type="detail"
        className="textarea textarea-bordered"
        placeholder="Tel & Detail "
      ></textarea>

      <p>Latitude: {position?.lat.toFixed(2)}</p>
      <p>Longitude: {position?.lng.toFixed(2)}</p>
      {/* ถ้ามี position จะดึงค่า lat และ lng ออกมา แล้วแสดงโดยจำกัดทศนิยมไว้ที่ 2 ตำแหน่ง */}

      <button className="btn btn-secondary text-xl text-white">Submit</button>
    </form>
  );
}