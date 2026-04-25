import { Outlet } from 'react-router';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function Layout() {
  return (
    <div className="min-h-screen bg-white flex" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto bg-[#F8FAFB]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
