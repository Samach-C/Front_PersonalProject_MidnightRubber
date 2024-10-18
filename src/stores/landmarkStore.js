import axios from "axios";
import { create } from "zustand";


const useLandmarkStore = create((set, get) => ({
    landmarks: [], //เก็บรายการ landmark

    // อ่านข้อมูล landmark
    fetchLandmarks: async() => {
        try {
            const response = await axios.get("http://localhost:5588/landmark")
            // console.log("Fetched landmarks:", response.data)
            set({ landmarks: response.data })
            return response.data
        } catch (error) {
            console.error("Error fetching landmarks:", error)
            return []
        }
    },

    // อัพเดต landmark
    updateLandmark: async(token, id, updatedData) => {
        try {
            const response = await axios.patch(`http://localhost:5588/landmark/${id}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`
                  },
            })
            console.log("Updated landmark id:", id)
            set({
                landmarks: get().landmarks.map((landmark) =>
                    landmark?.id === id ? { ...landmark, ...updatedData} : landmark
                )
            })
            return response.data
        } catch (error) {
            console.error("Error updating landmark:", error)
        }
    },

    // ลบ landmark
    deleteLandmark: async(token, id) => {
        try {
            await axios.delete(`http://localhost:5588/landmark/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                  },
            })
            console.log("Deleted landmark id:", id)
            set({
                landmarks: get().landmarks.filter((landmark) => landmark.id !== id)
            })
        } catch (error) {
            console.error("Error deleting landmark:", error)
        }
    },
}))

export default useLandmarkStore


    // // เพิ่ม landmark
    // addLandmark: async(landmarkData) => {
    //     try {
    //         const response = await axios.post("http://localhost:5588/landmark", landmarkData)
    //         set({ landmarks: [...get().landmarks, response.data] })
    //     } catch (error) {
    //         console.error("Error adding landmark:", error)
    //     }
    // },