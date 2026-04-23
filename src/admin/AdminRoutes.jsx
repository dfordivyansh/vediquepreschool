import { Routes, Route } from "react-router-dom";
import AdminLayout from "./AdminLayout";

import Dashboard from "./pages/Dashboard";
import Gallery from "./pages/Gallery";
import Login from "./pages/Login";
import AdminReviews from "./pages/AdminReviews";
import AdminContacts from "./pages/AdminContacts";
import AdminSEO from "./pages/AdminSEO";
import AdminFAQ from "./pages/AdminFAQ";
import AdminPromo from "./pages/AdminPromo";
import AdminArticlesList from './pages/AdminArticlesList';
import AddArticle from './pages/AddArticle';
import EditArticle from './pages/EditArticle'; // 🔥 ADD THIS

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Layout wrapper */}
      <Route element={<AdminLayout />}>

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="reviews" element={<AdminReviews />} />
        <Route path="contacts" element={<AdminContacts />} />
        <Route path="seo" element={<AdminSEO />} />
        <Route path="faqs" element={<AdminFAQ />} />
        <Route path="promo" element={<AdminPromo />} />

        {/* 🔥 ARTICLES */}
        <Route path="articles" element={<AdminArticlesList />} />
        <Route path="add-article" element={<AddArticle />} />

        {/* 🔥 EDIT ROUTE */}
        <Route path="edit-article/:id" element={<EditArticle />} />

      </Route>
    </Routes>
  );
};

export default AdminRoutes;