import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";



const useUserStore = create(persist ((set, get) => ({
    user: null,
    token: "",
    login: async(input) => {
        const result = await axios.post(import.meta.env.VITE_HOST_IP+"/login", input)
        set({token : result.data.token, user : result.data.user})
        // console.log(result.data)
        return result.data
    },
    logout: () => {
        // console.log("logout")
        set({token: "", user: null})
    },
}), {
    name: "state",
    storage: createJSONStorage(() => localStorage)
}
))

export default useUserStore