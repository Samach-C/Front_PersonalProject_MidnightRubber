import React from 'react'
// import MainMap from '../../components/MainMap'

export default function MapContent() {
  return (
    <div className="flex flex-col gap-4 bg-white rounded-sm border border-gray-200 p-4 shadow-md">
        
    </div>
  )
}


// import React, { useState, useEffect } from "react";
// import useLandmarkStore from "../../stores/landmarkStore";
// import useUserStore from "../../stores/userStore"; // ดึง token มาจาก user store หรือ localStorage

// export default function LandmarkManagement() {
//   const token = useUserStore((state) => state.token); // ดึง token จาก store
//   const { landmarks, fetchLandmarks, addLandmark, updateLandmark, deleteLandmark } = useLandmarkStore();
  
//   const [newLandmark, setNewLandmark] = useState({ name: "", description: "" });
//   const [editingLandmark, setEditingLandmark] = useState(null);

//   // ดึงข้อมูล landmarks เมื่อ component ถูก mount
//   useEffect(() => {
//     fetchLandmarks(token); // ส่ง token ไปเมื่อดึงข้อมูล
//   }, [token]);

//   // การเพิ่ม landmark
//   const handleAddLandmark = async () => {
//     await addLandmark(newLandmark, token); // ส่ง token ไปเมื่อเพิ่ม landmark
//     setNewLandmark({ name: "", description: "" });
//   };

//   // การแก้ไข landmark
//   const handleEditLandmark = async (id) => {
//     await updateLandmark(id, editingLandmark, token); // ส่ง token ไปเมื่อแก้ไข landmark
//     setEditingLandmark(null); // ปิดการแก้ไขหลังจากอัปเดตเสร็จ
//   };

//   // การลบ landmark
//   const handleDeleteLandmark = async (id) => {
//     await deleteLandmark(id, token); // ส่ง token ไปเมื่อทำการลบ
//   };

//   return (
//     <div>
//       <h1>Landmark Management</h1>

//       {/* เพิ่ม landmark */}
//       <div>
//         <h2>Add Landmark</h2>
//         <input
//           type="text"
//           placeholder="Landmark Name"
//           value={newLandmark.name}
//           onChange={(e) => setNewLandmark({ ...newLandmark, name: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Landmark Description"
//           value={newLandmark.description}
//           onChange={(e) => setNewLandmark({ ...newLandmark, description: e.target.value })}
//         />
//         <button onClick={handleAddLandmark}>Add</button>
//       </div>

//       {/* แสดงผลรายการ landmarks */}
//       <div>
//         <h2>Landmark List</h2>
//         {landmarks.map((landmark) => (
//           <div key={landmark.id}>
//             {editingLandmark && editingLandmark.id === landmark.id ? (
//               // แก้ไข landmark
//               <div>
//                 <input
//                   type="text"
//                   value={editingLandmark.name}
//                   onChange={(e) =>
//                     setEditingLandmark({ ...editingLandmark, name: e.target.value })
//                   }
//                 />
//                 <input
//                   type="text"
//                   value={editingLandmark.description}
//                   onChange={(e) =>
//                     setEditingLandmark({ ...editingLandmark, description: e.target.value })
//                   }
//                 />
//                 <button onClick={() => handleEditLandmark(landmark.id)}>Save</button>
//                 <button onClick={() => setEditingLandmark(null)}>Cancel</button>
//               </div>
//             ) : (
//               // แสดงข้อมูล landmark
//               <div>
//                 <h3>{landmark.name}</h3>
//                 <p>{landmark.description}</p>
//                 <button onClick={() => setEditingLandmark(landmark)}>Edit</button>
//                 <button onClick={() => handleDeleteLandmark(landmark.id)}>Delete</button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }