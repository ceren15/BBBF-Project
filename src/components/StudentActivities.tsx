"use client"; // Eğer Next.js 13+ app router kullanıyorsanız

import { useState } from "react";

const mockInternships = [
  { id: 1, name: "Staj 1 - Yaz Dönemi" },
  { id: 2, name: "Staj 2 - Bahar Dönemi" },
];

export default function StudentActivities() {
  const [selectedInternship, setSelectedInternship] = useState<string | null>(null);
  const [activities, setActivities] = useState<Record<string, { title: string; content: string }[]>>({});
  const [showForm, setShowForm] = useState(false);
  const [newActivity, setNewActivity] = useState({ title: "", content: "" });

  const handleAddActivity = () => {
    if (!selectedInternship) return alert("Lütfen bir staj seçin.");
    if (!newActivity.title || !newActivity.content)
      return alert("Lütfen başlık ve içerik girin.");

    const updated = { ...activities };
    const current = updated[selectedInternship] || [];
    updated[selectedInternship] = [...current, newActivity];

    setActivities(updated);
    setNewActivity({ title: "", content: "" });
    setShowForm(false);
  };

  const allActivities = Object.entries(activities).flatMap(([internshipId, acts]) =>
    acts.map((act) => ({
      ...act,
      internshipId,
      internshipName:
        mockInternships.find((i) => i.id.toString() === internshipId)?.name || "Bilinmeyen Staj",
    }))
  );

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Öğrenci Aktiviteleri</h2>

      <div className="flex items-end gap-4 mb-6">
        <div className="flex flex-col w-full sm:w-auto">
          <label className="text-sm font-medium mb-3">Staj Seç:</label>
          <select
            className="border rounded px-4 py-2 text-sm"
            value={selectedInternship || ""}
            onChange={(e) => setSelectedInternship(e.target.value)}
          >
            <option value="" disabled>
              -- Staj Seçin --
            </option>
            {mockInternships.map((internship) => (
              <option key={internship.id} value={internship.id.toString()}>
                {internship.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-black text-white font-medium px-5 py-2 rounded text-sm"
        >
          {showForm ? "İptal" : "+ Yeni Aktivite Ekle"}
        </button>
      </div>

      {showForm && (
        <div className="border rounded p-4 bg-gray-50 mb-6">
          <label className="block mb-1 text-sm">Başlık</label>
          <input
            type="text"
            className="border w-full px-3 py-2 mb-3 text-sm"
            value={newActivity.title}
            onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
          />
          <label className="block mb-1 text-sm">İçerik</label>
          <textarea
            className="border w-full px-3 py-2 mb-3 text-sm"
            value={newActivity.content}
            onChange={(e) => setNewActivity({ ...newActivity, content: e.target.value })}
          />
          <button
            onClick={handleAddActivity}
            className="bg-black text-white font-medium px-4 py-2 rounded text-sm"
          >
            Kaydet
          </button>
        </div>
      )}

      {allActivities.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-sm rounded text-left border border-gray-100">
            <thead className="bg-gray-100 text-sm text-gray-700">
              <tr>
                <th className="px-4 py-2">Staj</th>
                <th className="px-4 py-2">Başlık</th>
                <th className="px-4 py-2">İçerik</th>
              </tr>
            </thead>
            <tbody>
              {allActivities.map((act, idx) => (
                <tr key={idx} className="hover:bg-gray-50 text-sm">
                  <td className="px-4 py-2 font-medium text-black">{act.internshipName}</td>
                  <td className="px-4 py-2">{act.title}</td>
                  <td className="px-4 py-2">{act.content}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
