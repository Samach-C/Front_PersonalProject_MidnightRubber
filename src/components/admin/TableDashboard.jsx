import React, { useEffect, useState } from "react";
import useUserStore from "../../stores/userStore";
import useLandmarkStore from "../../stores/landmarkStore";

export default function TableDashboard() {
  const [landmark, setLandmark] = useState([]);
  const [editRowId, setEditRowId] = useState(null); //ติดตามแถวที่กำลังถูกแก้ไข
  const [editedLandmark, setEditedLandmark] = useState({}); //เก็บค่าที่ถูกแก้ไข

  const token = useUserStore((state) => state.token);

  const fetchLandmarks = useLandmarkStore((state) => state.fetchLandmarks);
  const deleteLandmark = useLandmarkStore((state) => state.deleteLandmark);
  const updateLandmark = useLandmarkStore((state) => state.updateLandmark);

  useEffect(() => {
    getLandmarkData();
  }, []);

  // ดูข้อมูลแผนที่
  const getLandmarkData = async () => {
    try {
      const resp = await fetchLandmarks(); // เรียกใช้ fetchLandmarks เพื่อดึงข้อมูล
    //   console.log(resp);
      setLandmark(resp); // เก็บข้อมูลที่ดึงมาใน state
    } catch (err) {
      console.log(err);
    }
  };

  // ลบสมาชิก
  const hdlDeleteLandmark = async (id) => {
    try {
      await deleteLandmark(token, id) // ลบข้อมูล landmark ตาม id
      getLandmarkData()
    } catch (err) {
      console.log(err);
    }
  };

  // อัพเดตข้อมูล
  const hdlUpdateMessage = async (id) => {
    try {
      await updateLandmark(token, id, editedLandmark); // อัปเดตข้อมูล landmark
      getLandmarkData(); // อัปเดตข้อมูลใหม่หลังจากอัปเดต
      setEditRowId(null); // ยกเลิกการแก้ไขแถว
    } catch (err) {
      console.log(err);
    }
  };

  // การแก้ไขแถว
  const startEditing = (id, currentTitle, currentDetail) => {
    setEditRowId(id); // กำหนดแถวที่กำลังแก้ไข
    setEditedLandmark({ title: currentTitle, detail: currentDetail }); // เก็บค่าที่จะแก้ไข
  };

  // ยกเลิกการแก้ไข
  const cancelEditing = () => {
    setEditRowId(null); // ยกเลิกการแก้ไข
    setEditedLandmark({}); // ล้างค่าที่แก้ไข
  };

  // จัดการกับการเปลี่ยนแปลงของ fill input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedLandmark({ ...editedLandmark, [name]: value });
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Title</th>
            <th scope="col">Detail</th>
            <th scope="col">UserID</th>
            <th scope="col">CreatedAt</th>
            <th scope="col">UpdatedAt</th>
            <th scope="col">Latitude</th>
            <th scope="col">Longitude</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>

        <tbody>
          {landmark.map((item, index) => {
            // console.log(item);
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  {editRowId === item.id ? (
                    <input
                      type="text"
                      name="title"
                      value={editedLandmark.title}
                      onChange={handleInputChange}
                    />
                  ) : (
                    item.title
                  )}
                </td>

                <td>
                  {editRowId === item.id ? (
                    <input
                      type="text"
                      name="detail"
                      value={editedLandmark.detail || ""}
                      onChange={handleInputChange}
                    />
                  ) : (
                    item.detail
                  )}
                </td>

                <td>{item.id}</td>

                <td>{item.createdAt}</td>

                <td>{item.updatedAt}</td>

                <td>{item.lat}</td>

                <td>{item.lng}</td>

                <td>
                  {editRowId === item.id ? (
                    <>
                      <button
                        className="btn btn-xs btn-success"
                        onClick={() => hdlUpdateMessage(item.id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-xs btn-secondary"
                        onClick={cancelEditing}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-xs btn-warning"
                        onClick={() =>
                          startEditing(item.id, item.title, item.detail)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-xs btn-error"
                        onClick={() => hdlDeleteLandmark(item.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
