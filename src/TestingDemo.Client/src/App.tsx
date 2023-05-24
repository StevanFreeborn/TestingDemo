import { Route, Routes } from 'react-router-dom';
import { ContentPage } from './pages/ContentPage';
import { DashboardPage } from './pages/DashboardPage';
import ErrorPage from './pages/ErrorPage';
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
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}
