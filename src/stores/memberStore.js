import axios from "axios";
import { create } from "zustand";


const useMemberStore = create((set, get) => ({
    members: [], // สร้าง state สำหรับเก็บสมาชิก
  
    // ฟังก์ชันดึงข้อมูลสมาชิก
    listMember: async () => {
      try {
        const response = await axios.get("http://localhost:5588/member");
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
        await axios.delete(`http://localhost:5588/member/${id}`, {
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
        await axios.patch(`http://localhost:5588/member/${id}`, form, {
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





// const useMemberStore = create((set, get) => ({
//     listMember : () => {
//         axios.get("http://localhost:5588/member")
//         console.log(listMember)
//     },

//     removeMember : (token, id) => {
//         axios.delete("http://localhost:5588/member/" + id, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//     },

//     updateMember : (token, id, form) => {
//         axios.patch("http://localhost:5588/member/" + id, form, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             }
//         })
//     }
// }))