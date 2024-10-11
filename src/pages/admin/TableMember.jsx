import React, { useEffect, useState } from "react";
import useUserStore from "../../stores/userStore";
import axios from "axios";

export default function TableMember() {
  const [member, setMember] = useState([])

  const token = useUserStore(state => state.token)

  useEffect(() => {

  }, [])

  const getData = async() => {
    try {
      const resp = await axios.get("http://localhost:5588/member")
      console.log(resp)
    } catch (err) {
      console.log(err)
    }

    // const hdlRemoveMember = async(id) => {
    //   try {
    //     const resp = await removeMember(token, id);
    //     console.log(resp);
    //     getData();
    //   } catch (err) {
    //     console.log(err);
    //   }
    //   // console.log(id);
    // };
  
    // const hdlUpdateMember = async(e, id) => {
    //   // console.log(e.target.value, id)
    //   const role = e.target.value
    //   console.log({role})
    //   try {
    //     const resp = await updateMember(token, id, { role })
    //     console.log(resp)
    //     toast.success(resp.data.message)
    //     getData()
    //   } catch (err) {
    //     console.log(err)
    //   }
    // }

    const role = ["ADMIN", "USER"]
  }
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>

        <tbody>
          {
            member.map((item, index) => {
              return (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{item.email}</td>


            <td>
              <select onChange={(e) => hdlUpdateMember(e, item.id)}
                defaultValue={item.role}>
                  <option>ADMIN</option>
                  <option>USER</option>
              </select>
            </td>

            <td>
              <p onClick={() => hdlRemoveMember(item.id)}>Delete</p>
            </td>
          </tr>

              )
            })
          }
        </tbody>
      </table>
    </div>
  );
}
