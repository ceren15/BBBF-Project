'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDownIcon, FileTextIcon, UsersIcon } from '@/components/IconComponents';
import { GoPeople } from 'react-icons/go';
import { VscBook, VscSettingsGear } from 'react-icons/vsc';
import { HiOutlineSquares2X2 } from 'react-icons/hi2';
import { PiBookOpenUserFill } from 'react-icons/pi';

const user = { name: 'admin test', email: 'admin@ogr.mehmetakif.edu.tr' };
const getInitials = (name: string) => name.split(' ').map((word) => word[0]).join('').toUpperCase();

interface ExpandedMenus {
  [key: string]: boolean;
}

const SidebarMenu = ({ title, icon: Icon, menuId, expandedMenus, toggleMenu, children }: any) => (
  <div>
    <div onClick={() => toggleMenu(menuId)} className="px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-[var(--hover)]">
      <span className="flex items-center text-sm text-[var(--foreground)]">
        <Icon size={20} />
        <p className="pl-2">{title}</p>
      </span>
      <ChevronDownIcon />
    </div>
    {expandedMenus[menuId] && <div className="pl-5 bg-[var(--background)]">{children}</div>}
  </div>
);

export default function AdminPanel() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<ExpandedMenus>({
    'staj-yonetimi': false,
    'ogrenci-islemleri': false,
    'sistem-yonetimi': false,
    'panel': false,
  });

  const toggleMenu = (menuId: string) => {
    setExpandedMenus((prev) => ({ ...prev, [menuId]: !prev[menuId] }));
  };

  return (
    <div className="flex h-screen bg-[var(--background)] text-[var(--foreground)]">
      {sidebarOpen && (
        <div className="w-64 bg-[var(--background)] shadow-md relative border-r border-[var(--border)]">
          <div className="p-4">
            <div className="flex items-center">
              <div>
                <div className="flex items-center text-sm font-medium">
                  <PiBookOpenUserFill size={30} />
                  <p className="pl-2">Staj Defteri</p>
                </div>
                <div className="text-xs text-[var(--foreground)] opacity-60">Yönetici</div>
              </div>
            </div>
          </div>

          <div className="py-2">
            <div className="px-4 py-2 text-sm opacity-70">Platform</div>
            <div className="mt-1">
              <SidebarMenu menuId="panel" title="Panel" icon={HiOutlineSquares2X2} expandedMenus={expandedMenus} toggleMenu={toggleMenu}>
                <div className="px-4 py-2 text-sm hover:bg-[var(--hover)] cursor-pointer">Genel Bakış</div>
              </SidebarMenu>
              <SidebarMenu menuId="staj-yonetimi" title="Staj Yönetimi" icon={VscBook} expandedMenus={expandedMenus} toggleMenu={toggleMenu}>
                <div className="px-4 py-2 text-sm hover:bg-[var(--hover)] cursor-pointer">Staj Dönemleri</div>
                <div onClick={() => router.push('/applications')} className="px-4 py-2 text-sm hover:bg-[var(--hover)] cursor-pointer">Başvurular</div>
                <div className="px-4 py-2 text-sm hover:bg-[var(--hover)] cursor-pointer">Resmi Tatiller</div>
              </SidebarMenu>
              <SidebarMenu menuId="ogrenci-islemleri" title="Öğrenci İşlemleri" icon={GoPeople} expandedMenus={expandedMenus} toggleMenu={toggleMenu}>
                <div className="px-4 py-2 text-sm hover:bg-[var(--hover)] cursor-pointer">Öğrenci Listesi</div>
                <div onClick={() => router.push('/student-activities')} className="px-4 py-2 text-sm hover:bg-[var(--hover)] cursor-pointer">Öğrenci Aktiviteleri</div>
              </SidebarMenu>
              <SidebarMenu menuId="sistem-yonetimi" title="Sistem Yönetimi" icon={VscSettingsGear} expandedMenus={expandedMenus} toggleMenu={toggleMenu}>
                <div className="px-4 py-2 text-sm hover:bg-[var(--hover)] cursor-pointer">Yönetici Listesi</div>
              </SidebarMenu>
            </div>
          </div>

          <div className="absolute bottom-0 w-64 py-4 px-4 border-t border-[var(--border)]">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-gray-400 flex items-center justify-center text-sm font-semibold text-white">
                {getInitials(user.name)}
              </div>
              <div className="flex flex-col">
                <div className="text-sm leading-tight">{user.name}</div>
                <div className="text-xs opacity-70 leading-tight">{user.email}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 p-8 overflow-auto">
        <div className="mb-6 flex items-center">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-4">
            <img src="/sidebar.png" alt="Toggle Sidebar" className="h-6 w-6" />
          </button>
        </div>
        <hr className="border-[var(--border)]" />

        <div className="mb-6">
          <div className="text-xl py-4"><strong>Hoş Geldiniz, {user.name}</strong></div>
          <button className="bg-black text-white px-4 py-2 rounded text-sm"> + Yeni Staj Dönemi Oluştur</button>
        </div>

        <div className="grid grid-cols-10 gap-6">
          <div className="col-span-5 bg-[var(--background)] p-6 rounded shadow-sm border border-[var(--border)]">
            <h2 className="font-medium mb-4">Başvuru İstatistikleri</h2>
            <div className="flex flex-col items-center justify-center h-32">
              <FileTextIcon />
              <p className="text-sm opacity-70 mt-2">Henüz başvuru bulunmamaktadır.</p>
            </div>
          </div>

          <div className="col-span-5 flex flex-col gap-6">
            <div className="bg-[var(--background)] p-6 rounded shadow-sm border border-[var(--border)]">
              <h2 className="font-medium mb-4">Toplam Öğrenci Sayısı</h2>
              <div className="flex items-center justify-center h-20">
                <div className="text-2xl text-center">0</div>
              </div>
            </div>

            <div className="bg-[var(--background)] p-6 rounded shadow-sm border border-[var(--border)]">
              <h2 className="font-medium mb-4">Bölümlere Göre Öğrenci Dağılımı</h2>
              <div className="flex flex-col items-center justify-center h-20">
                <UsersIcon />
                <p className="text-sm opacity-70 mt-2">Henüz öğrenci kaydı bulunmamaktadır.</p>
              </div>
            </div>
          </div>

          <div className="col-span-10 bg-[var(--background)] p-6 rounded shadow-sm border border-[var(--border)]">
            <h2 className="font-medium mb-4">Öğretmen Ataması</h2>
            <div className="flex flex-col items-center justify-center h-32">
              <FileTextIcon />
              <p className="text-sm opacity-70 mt-2">Henüz atama bulunmamaktadır.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
