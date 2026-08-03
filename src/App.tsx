import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { PlansPage } from "./pages/PlansPage";
import { GalleryPage } from "./pages/GalleryPage";
import { WellnessPage } from "./pages/WellnessPage";
import { ContactPage } from "./pages/ContactPage";
import { CoachesPage } from "./pages/CoachesPage";
import { CoachDetailPage } from "./pages/CoachDetailPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="plans" element={<PlansPage />} />
          <Route path="membership" element={<PlansPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="wellness" element={<WellnessPage />} />
          <Route path="coaches" element={<CoachesPage />} />
          <Route path="coaches/:slug" element={<CoachDetailPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
