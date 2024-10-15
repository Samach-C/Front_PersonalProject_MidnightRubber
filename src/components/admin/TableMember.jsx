import React, { useEffect, useState } from "react";
import useUserStore from "../../stores/userStore";
import useMemberStore from "../../stores/memberStore";

export default function TableMember() {
  const [member, setMember] = useState([]);

  const token = useUserStore((state) => state.token);

  const listMember = useMemberStore((state) => state.listMember);
  const removeMember = useMemberStore((state) => state.removeMember);
  const updateMember = useMemberStore((state) => state.updateMember);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const resp = await listMember(); // เรียกใช้ listMember จาก store
      console.log(resp);
      setMember(resp); // ใช้ข้อมูลสมาชิกที่ได้จากการเรียก API
    } catch (err) {
      console.log(err);
    }
  };

  // ลบสมาชิก
  const hdlRemoveMember = async (id) => {
    try {
      await removeMember(token, id);
      getData(); // เรียกข้อมูลสมาชิกใหม่หลังจากลบเสร็จ
    } catch (err) {
      console.log(err);
    }
  };

  // อัปเดตบทบาทสมาชิก
  const hdlUpdateMember = async (e, id) => {
    const role = e.target.value;
    try {
      await updateMember(token, id, { role });
      getData(); // เรียกข้อมูลสมาชิกใหม่หลังจากอัปเดตเสร็จ
    } catch (err) {
      console.log(err);
    }
  };

  const roleOptions = ["ADMIN", "USER"];

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
          {member.map((item, index) => {
            // console.log(item)
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.email}</td>

                <td>
                  <select
                    className="border"
                    onChange={(e) => hdlUpdateMember(e, item.id)}
                    defaultValue={item.role}
                  >
                    {roleOptions.map((role, i) => (
                      <option key={i} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </td>

                <td>
                  <button className="btn btn-xs btn-error" onClick={() => hdlRemoveMember(item.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// try {
//   const resp = await listMember()
//   console.log(resp)
//   setMember(resp.data)
// } catch (err) {
//   console.log(err)
// }

// const hdlRemoveMember = async(id) => {
//   // try {
//   //   const resp = await removeMember(token, id);
//   //   console.log(resp);
//   //   getData();
//   // } catch (err) {
//   //   console.log(err);
//   // }
//   // // console.log(id);
// };

// const hdlUpdateMember = async(e, id) => {
//   // // console.log(e.target.value, id)
//   // const role = e.target.value
//   // console.log({role})
//   // try {
//   //   const resp = await updateMember(token, id, { role })
//   //   console.log(resp)
//   //   toast.success(resp.data.message)
//   //   getData()
//   // } catch (err) {
//   //   console.log(err)
//   // }
// }
