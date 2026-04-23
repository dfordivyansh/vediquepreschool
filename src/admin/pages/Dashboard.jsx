import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

import {
  FaNewspaper,
  FaAddressBook,
  FaStar,
  FaQuestionCircle,
  FaPlus,
  FaImages,
  FaBullhorn,
  FaSearch,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [counts, setCounts] = useState({
    articles: 0,
    contacts: 0,
    reviews: 0,
    faqs: 0,
  });

  const [recent, setRecent] = useState([]);

  /* 🔥 FETCH COUNTS */
  useEffect(() => {
    const unsub1 = onSnapshot(collection(db, "articles"), (snap) => {
      setCounts((prev) => ({ ...prev, articles: snap.size }));
    });

    const unsub2 = onSnapshot(collection(db, "contacts"), (snap) => {
      setCounts((prev) => ({ ...prev, contacts: snap.size }));
    });

    const unsub3 = onSnapshot(collection(db, "reviews"), (snap) => {
      setCounts((prev) => ({ ...prev, reviews: snap.size }));
    });

    const unsub4 = onSnapshot(collection(db, "faqs"), (snap) => {
      setCounts((prev) => ({ ...prev, faqs: snap.size }));
    });

    return () => {
      unsub1();
      unsub2();
      unsub3();
      unsub4();
    };
  }, []);

  /* 🔥 RECENT ACTIVITY */
  useEffect(() => {
    const q = query(
      collection(db, "articles"),
      orderBy("createdAt", "desc"),
      limit(5)
    );

    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((doc) => doc.data());
      setRecent(data);
    });

    return () => unsub();
  }, []);

  /* 🔥 CARD DATA */
  const stats = [
    {
      title: "Articles",
      count: counts.articles,
      icon: <FaNewspaper />,
      color: "#6B4FA3",
    },
    {
      title: "Contacts",
      count: counts.contacts,
      icon: <FaAddressBook />,
      color: "#E38342",
    },
    {
      title: "Reviews",
      count: counts.reviews,
      icon: <FaStar />,
      color: "#3493C5",
    },
    {
      title: "FAQs",
      count: counts.faqs,
      icon: <FaQuestionCircle />,
      color: "#b62474",
    },
  ];

  /* 🔥 QUICK ACTIONS */
  const actions = [
    {
      label: "Add Article",
      icon: <FaPlus />,
      route: "/admin/add-article",
    },
    {
      label: "Manage Articles",
      icon: <FaNewspaper />,
      route: "/admin/articles",
    },
    {
      label: "Gallery",
      icon: <FaImages />,
      route: "/admin/gallery",
    },
    {
      label: "Promo",
      icon: <FaBullhorn />,
      route: "/admin/promo",
    },
    {
      label: "SEO",
      icon: <FaSearch />,
      route: "/admin/seo",
    },
    {
      label: "FAQs",
      icon: <FaQuestionCircle />,
      route: "/admin/faqs",
    },
  ];

  return (
    <div>
      {/* HEADER */}
      <h1 className="text-3xl font-extrabold text-[#b62474] mb-6">
        Dashboard
      </h1>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
        {stats.map((s, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl shadow-lg text-white"
            style={{
              background: `linear-gradient(135deg, ${s.color}, #ffffff30)`,
            }}
          >
            <div className="text-2xl mb-2">{s.icon}</div>
            <h3 className="text-xl font-bold">{s.count}</h3>
            <p className="text-sm opacity-90">{s.title}</p>
          </div>
        ))}
      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <h2 className="text-xl font-bold text-[#3A216A] mb-4">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        {actions.map((a, i) => (
          <div
            key={i}
            onClick={() => navigate(a.route)}
            className="cursor-pointer p-6 rounded-2xl shadow-md bg-white text-center hover:scale-105 transition"
          >
            <div className="text-2xl text-[#6B4FA3] mb-3">
              {a.icon}
            </div>
            <p className="font-semibold text-[#2E1A47]">
              {a.label}
            </p>
          </div>
        ))}
      </div>

      {/* ================= RECENT ACTIVITY ================= */}
      <h2 className="text-xl font-bold text-[#3A216A] mb-4">
        Recent Articles
      </h2>

      <div className="bg-white rounded-2xl shadow p-5">
        {recent.length === 0 ? (
          <p className="text-gray-500">No recent activity</p>
        ) : (
          <div className="space-y-3">
            {recent.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center border-b pb-2"
              >
                <p className="text-[#2E1A47] font-medium">
                  {item.title}
                </p>
                <span className="text-xs text-gray-500">
                  New
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;