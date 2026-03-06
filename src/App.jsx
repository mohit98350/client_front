import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { AnalyticsPage } from "@/pages/AnalyticsPage";
import { LibraryPage } from "@/pages/LibraryPage";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="*" element={<Navigate to="/library" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
