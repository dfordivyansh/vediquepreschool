import React, { useEffect, useState } from "react";
import { db } from "../admin/firebase/config";
import { doc, onSnapshot } from "firebase/firestore";
import { Helmet } from "react-helmet";

const SEOContent = ({ slug }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "seo_pages", slug), (docSnap) => {
      if (docSnap.exists()) {
        setData(docSnap.data());
      }
    });

    return () => unsub();
  }, [slug]);

  if (!data) return null;

  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>{data.title}</title>
        <meta name="description" content={data.description} />
        <meta name="keywords" content={data.keywords} />
      </Helmet>

      {/* ===== SECTION ===== */}
      <section
        className="w-full relative py-12 px-4 sm:px-6"
        style={{
          background:
            "radial-gradient(circle at center, #F1E9FF 0%, #F7F2FF 50%, #FFFFFF 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto">

          {/* 🔥 CONTENT BOX (MATCHED STYLE) */}
          <div
            className="rounded-[28px] p-6 sm:p-10 shadow-xl border border-[#6B4FA3]/10"
            style={{
              background:
                "radial-gradient(circle at top right, #E9DCFF 0%, #F7F2FF 60%, #FFFFFF 100%)",
            }}
          >
            <div
              className="seo-content prose max-w-none"
              dangerouslySetInnerHTML={{ __html: data.content }}
            />
          </div>

        </div>

        {/* 🎨 CUSTOM TYPOGRAPHY */}
        <style>{`
          .seo-content h1 {
            font-size: 32px;
            font-weight: 800;
            color: #6B4FA3;
            margin-bottom: 12px;
          }

          .seo-content h2 {
            font-size: 24px;
            font-weight: 700;
            color: #b62474;
            margin-top: 20px;
            margin-bottom: 10px;
          }

          .seo-content h3 {
            font-size: 20px;
            font-weight: 600;
            color: #6B4FA3;
            margin-top: 16px;
          }

          .seo-content p {
            color: #2E1A47;
            font-size: 16px;
            line-height: 1.7;
            margin-bottom: 10px;
          }

          .seo-content strong {
            color: #b62474;
            font-weight: 700;
          }

          .seo-content ul {
            margin: 10px 0;
            padding-left: 18px;
          }

          .seo-content li {
            margin-bottom: 6px;
            color: #3A216A;
            position: relative;
          }

          .seo-content li::marker {
            color: #6B4FA3;
          }
        `}</style>
      </section>
    </>
  );
};

export default SEOContent;