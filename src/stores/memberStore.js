import { create } from "zustand";


const useMemberStore = create((set, get) => ({
    listMember : async() => {
        // const result = await axios.post("http://localhost:5588/member", {
        //     headers : { Authorization : `Bearer ${token}`}
        // })
        // set(state => ({
        //     posts : [ {...result.data, user, likes: [], comments : []}, ...state.posts ]
        // }))
        axios.get("http://localhost:5588/member")
        console.log(listMember)
    },

    // removeMember : () => {
    //     axios.delete("http://localhost:5588/member/" + id, {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       });
    // },

    // updateMember : () => {

    // }
}))

export default useMemberStore