import axios from "axios";
import { create } from "zustand";


const useLandmarkStore = create((set, get) => ({
    landmarks: [], //เก็บรายการ landmark

    createLandmarks:  async(form, token) => {
        try {
            const response = await axios.post(import.meta.env.VITE_HOST_IP+"/landmark", form, {
                headers: { Authorization: `Bearer ${token}` },
              });
              set((state) => ({ landmarks:[...get().landmarks, response.data]}))
        } catch (error) {
            console.log("Error creating landmark:", error)
        }
    },

    // อ่านข้อมูล landmark
    fetchLandmarks: async() => {
        try {
            const response = await axios.get(import.meta.env.VITE_HOST_IP+"/landmark")
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
            const response = await axios.patch(import.meta.env.VITE_HOST_IP+`/landmark/${id}`, updatedData, {
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
            await axios.delete(import.meta.env.VITE_HOST_IP+`/landmark/${id}`, {
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