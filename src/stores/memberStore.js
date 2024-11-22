import axios from "axios";
import { create } from "zustand";


const useMemberStore = create((set, get) => ({
    members: [], // สร้าง state สำหรับเก็บสมาชิก
  
    // ฟังก์ชันดึงข้อมูลสมาชิก
    listMember: async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_HOST_IP+"/member");
        set({ members: response.data })
        return response.data; // อัปเดต state members
      } catch (error) {
        console.error("Error fetching members:", error)
        return [];
      }
    },
  
    // ฟังก์ชันลบสมาชิก
    removeMember: async (token, id) => {
      try {
        await axios.delete(import.meta.env.VITE_HOST_IP+`/member/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // หลังจากลบแล้ว ให้ดึงข้อมูลใหม่หรืออัปเดต state
        const updatedMembers = get().members.filter((member) => member.id !== id);
        set({ members: updatedMembers });
      } catch (error) {
        console.error("Error removing member:", error);
      }
    },
  
    // ฟังก์ชันอัปเดตสมาชิก
    updateMember: async (token, id, form) => {
      try {
        await axios.patch(import.meta.env.VITE_HOST_IP+`/member/${id}`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // หลังจากอัปเดตแล้ว ให้ดึงข้อมูลใหม่หรืออัปเดต state
        const updatedMembers = get().members.map((member) =>
          member.id === id ? { ...member, ...form } : member
        );
        set({ members: updatedMembers });
      } catch (error) {
        console.error("Error updating member:", error);
      }
    },
  }));
  

export default useMemberStore