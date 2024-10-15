// import axios from "axios";
// import { create } from "zustand";


// const useLandmarkStore = create((set, get) => ({
//     landmarks: [], //เก็บรายการ landmark

//     // อ่านข้อมูล landmark
//     fetchLandmarks: async() => {
//         try {
//             const response = await axios.get("http://localhost:5588/landmark")
//             set({ landmarks: response.data })
//         } catch (error) {
//             console.error("Error fetching landmarks:", error)
//         }
//     },

//     // เพิ่ม landmark
//     addLandmark: async(landmarkData) => {
//         try {
//             const response = await axios.post("http://localhost:5588/landmark", landmarkData)
//             set({ landmarks: [...get().landmarks, response.data] })
//         } catch (error) {
//             console.error("Error adding landmark:", error)
//         }
//     },

//     // อัพเดต landmark
//     updateLandmark: async(id, updatedData) => {
//         try {
//             const response = await axios.patch(`http://localhost:5588/landmark/${id}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                   },
//             })
//             set({
//                 landmarks: get().landmarks.map((landmark) =>
//                     landmark.id === id ? { ...landmark, ...updatedData} : landmark
//                 )
//             })
//         } catch (error) {
//             console.error("Error updating landmark:", error)
//         }
//     },

//     // ลบ landmark
//     deleteLandmark: async(id) => {
//         try {
//             await axios.delete(`http://localhost:5588/landmark/${id}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                   },
//             })
            
//             set({
//                 landmarks: get().landmarks.filter((landmark) => landmark.id !== id)
//             })
//         } catch (error) {
//             console.error("Error deleting landmark:", error)
//         }
//     },
// }))

// export default useLandmarkStore