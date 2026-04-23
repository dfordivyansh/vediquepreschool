import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  FaChartLine,   // 🔥 Dashboard ke liye new
  FaNewspaper,   // 🔥 Articles ke liye new
  FaPlusCircle,
  FaImages,
  FaSignOutAlt,
  FaStar,
  FaAddressBook,
  FaSearch,
  FaQuestionCircle,
  FaBullhorn,
} from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "./firebase/config";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin");
  };

  const linkStyle = (path) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-white text-[#3A216A] font-semibold shadow"
        : "hover:text-yellow-300"
    }`;

  return (
    <div className="flex h-screen overflow-hidden">

      {/* SIDEBAR */}
      <div className="w-64 bg-[#3A216A] text-white p-6 flex flex-col justify-between fixed h-screen">

        <div>
          <h1 className="text-2xl font-bold mb-10 text-center">
            Vedique Admin
          </h1>

          <div className="space-y-3">

            {/* ✅ Dashboard */}
            <Link to="/admin/dashboard" className={linkStyle("/admin/dashboard")}>
              <FaChartLine /> Dashboard
            </Link>

            {/* ✅ Articles */}
            <Link to="/admin/articles" className={linkStyle("/admin/articles")}>
              <FaNewspaper /> Articles
            </Link>

            <Link to="/admin/add-article" className={linkStyle("/admin/add-article")}>
              <FaPlusCircle /> Add Article
            </Link>

            {/* Leads */}
            <Link to="/admin/contacts" className={linkStyle("/admin/contacts")}>
              <FaAddressBook /> Contacts
            </Link>

            <Link to="/admin/reviews" className={linkStyle("/admin/reviews")}>
              <FaStar /> Reviews
            </Link>

            {/* Marketing */}
            <Link to="/admin/promo" className={linkStyle("/admin/promo")}>
              <FaBullhorn /> Promo Popup
            </Link>

            {/* SEO */}
            <Link to="/admin/seo" className={linkStyle("/admin/seo")}>
              <FaSearch /> SEO Pages
            </Link>

            <Link to="/admin/faqs" className={linkStyle("/admin/faqs")}>
              <FaQuestionCircle /> FAQs
            </Link>

            {/* Media */}
            <Link to="/admin/gallery" className={linkStyle("/admin/gallery")}>
              <FaImages /> Gallery
            </Link>

          </div>
        </div>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 bg-[#E38342] px-4 py-2 rounded-lg mt-6 hover:scale-[1.03] transition"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* MAIN */}
      <div
        className="flex-1 ml-64 p-4 sm:p-6 overflow-y-auto h-screen"
        style={{
          background:
            "radial-gradient(circle at top left, #E6E0F8, #D7C7F2)",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;