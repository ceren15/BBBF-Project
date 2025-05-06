'use client';
import { useState } from 'react';

const mockApplications = [
  {
    id: 1,
    student: 'Ali Yılmaz',
    company: 'ABC Yazılım A.Ş.',
    internshipTerm: 'Yaz 2025',
    date: '2025-04-20',
    status: 'Beklemede',
    feedback: 'İnceleniyor',
  },
  {
    id: 2,
    student: 'Ayşe Demir',
    company: 'XYZ Teknoloji Ltd.',
    internshipTerm: 'Bahar 2025',
    date: '2025-04-18',
    status: 'Onaylandı',
    feedback: 'Görüşmeye çağrıldı',
  },
];

export default function Applications() {
  const [applications, setApplications] = useState(mockApplications);

  return (
    <div className="p-6 max-w-screen-xl mx-auto text-[var(--foreground)] bg-[var(--background)]">
      <h1 className="text-3xl font-bold mb-6">Staj Başvuruları</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-[var(--border)] shadow-sm text-sm text-left bg-[var(--muted)]">
          <thead className="bg-[var(--muted)] text-[var(--foreground)]">
            <tr>
              <th className="px-4 py-3">Öğrenci</th>
              <th className="px-4 py-3">Şirket Bilgileri</th>
              <th className="px-4 py-3">Staj Dönemi</th>
              <th className="px-4 py-3">Başvuru Tarihi</th>
              <th className="px-4 py-3">Durum</th>
              <th className="px-4 py-3">Geri Bildirim</th>
              <th className="px-4 py-3">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="hover:bg-[var(--hover)] border-t border-[var(--border)]">
                <td className="px-4 py-2">{app.student}</td>
                <td className="px-4 py-2">{app.company}</td>
                <td className="px-4 py-2">{app.internshipTerm}</td>
                <td className="px-4 py-2">{app.date}</td>
                <td className="px-4 py-2">{app.status}</td>
                <td className="px-4 py-2">{app.feedback}</td>
                <td className="px-4 py-2">
                  <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm mr-2">Düzenle</button>
                  <button className="text-red-600 dark:text-red-400 hover:underline text-sm">Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
