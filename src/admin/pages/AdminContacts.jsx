import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);

  /* 🔥 FETCH REALTIME */
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "contacts"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        status: "pending", // default fallback
        ...doc.data(),
      }));

      setContacts(data);
    });

    return () => unsub();
  }, []);

  /* 🔁 TOGGLE STATUS */
  const toggleStatus = async (id, currentStatus) => {
    await updateDoc(doc(db, "contacts", id), {
      status: currentStatus === "pending" ? "resolved" : "pending",
    });
  };

  /* ❌ DELETE */
  const handleDelete = async (id) => {
    if (!confirm("Delete this enquiry?")) return;
    await deleteDoc(doc(db, "contacts", id));
  };

  return (
    <div className="p-6">

      {/* TITLE */}
      <h2 className="text-2xl font-bold mb-6 text-[#3A216A]">
        Contact Enquiries
      </h2>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">

        <table className="w-full text-sm text-left">
          
          {/* HEADER */}
          <thead className="bg-[#6B4FA3] text-white">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Email</th>
              <th className="p-3">Student</th>
              <th className="p-3">Programs</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-50">

                <td className="p-3 font-semibold text-[#6B4FA3]">
                  {c.guardian}
                </td>

                <td className="p-3">{c.phone}</td>
                <td className="p-3">{c.email}</td>
                <td className="p-3">{c.student}</td>

                <td className="p-3 text-xs">
                  {c.programs?.join(", ")}
                </td>

                {/* STATUS */}
                <td className="p-3">
                  <button
                    onClick={() => toggleStatus(c.id, c.status)}
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      c.status === "resolved"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {c.status === "resolved" ? "Resolved" : "Pending"}
                  </button>
                </td>

                {/* ACTIONS */}
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminContacts;