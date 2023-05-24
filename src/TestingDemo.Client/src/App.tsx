import { Route, Routes } from 'react-router-dom';
import { AdminPage } from './pages/AdminPage';
import { ContentPage } from './pages/ContentPage';
import { DashboardPage } from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import { ReportPage } from './pages/ReportPage';

export default function App() {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Routes>
        <Route index element={<DashboardPage />} />
        <Route path="Report" element={<ReportPage />} />
        <Route path="Content" element={<ContentPage />} />
        <Route path="Admin" element={<AdminPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
