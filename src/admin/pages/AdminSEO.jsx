import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  CheckCircle,
  FileText,
  Settings,
} from "lucide-react";

const PAGES = [
  { label: "Playgroup", slug: "playgroup" },
  { label: "Nursery", slug: "nursery" },
  { label: "LKG", slug: "lkg" },
  { label: "UKG", slug: "ukg" },
  { label: "Parent Toddler", slug: "parenttoddler" },
  { label: "Daycare", slug: "daycare" },
  { label: "Enrichment Programs", slug: "enrichmentprograms" },
];

const AdminSEO = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentPage = PAGES[currentIndex];

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [keywords, setKeywords] = useState("");
  const [content, setContent] = useState("");
  const [completed, setCompleted] = useState({});

  /* 🔥 EDITOR */
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  /* 🔥 FETCH */
  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDoc(doc(db, "seo_pages", currentPage.slug));

      if (snap.exists()) {
        const data = snap.data();

        setTitle(data.title || "");
        setDesc(data.description || "");
        setKeywords(data.keywords || "");
        setContent(data.content || "");

        editor?.commands.setContent(data.content || "");

        setCompleted((prev) => ({ ...prev, [currentPage.slug]: true }));
      } else {
        setTitle("");
        setDesc("");
        setKeywords("");
        setContent("");

        editor?.commands.clearContent();
      }
    };

    fetchData();
  }, [currentPage.slug, editor]);

  /* 💾 SAVE */
  const handleSave = async () => {
    await setDoc(doc(db, "seo_pages", currentPage.slug), {
      title,
      description: desc,
      keywords,
      content,
      updatedAt: Timestamp.now(),
    });

    setCompleted((prev) => ({
      ...prev,
      [currentPage.slug]: true,
    }));

    if (currentIndex < PAGES.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  /* TOOL BUTTON */
  const ToolBtn = ({ onClick, active, children }) => (
    <button
      onClick={onClick}
      className={`p-2 rounded-md border transition ${
        active
          ? "bg-[#6B4FA3] text-white"
          : "bg-white hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">

      <h2 className="text-3xl font-bold mb-6 text-[#6B4FA3]">
        SEO Content Manager 🚀
      </h2>

      {/* ===== STEPPER ===== */}
      <div className="flex flex-wrap gap-3 mb-8">
        {PAGES.map((p, i) => (
          <div
            key={p.slug}
            onClick={() => setCurrentIndex(i)}
            className={`cursor-pointer px-4 py-2 rounded-full text-sm flex items-center gap-2
              ${
                i === currentIndex
                  ? "bg-[#6B4FA3] text-white"
                  : completed[p.slug]
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100"
              }`}
          >
            {p.label}
            {completed[p.slug] && <CheckCircle size={14} />}
          </div>
        ))}
      </div>

      {/* ===== BASIC SEO ===== */}
      <div className="bg-white p-6 rounded-xl shadow mb-6 border">
        <h3 className="flex items-center gap-2 text-lg font-semibold mb-4 text-[#b62474]">
          <Settings size={18} /> Basic SEO
        </h3>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="SEO Title"
          className="w-full mb-3 p-3 border rounded"
        />

        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Meta Description"
          className="w-full mb-3 p-3 border rounded"
        />

        <input
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="Keywords (comma separated)"
          className="w-full p-3 border rounded"
        />
      </div>

      {/* ===== CONTENT EDITOR ===== */}
      <div className="bg-white border rounded-xl shadow mb-6">

        <div className="flex items-center gap-2 px-6 py-4 border-b text-[#b62474] font-semibold">
          <FileText size={18} /> Page Content
        </div>

        {/* TOOLBAR */}
        <div className="flex flex-wrap gap-2 p-3 border-b bg-gray-50">

          <ToolBtn
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor?.isActive("bold")}
          >
            <Bold size={18} />
          </ToolBtn>

          <ToolBtn
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor?.isActive("italic")}
          >
            <Italic size={18} />
          </ToolBtn>

          <ToolBtn
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            active={editor?.isActive("heading", { level: 1 })}
          >
            <Heading1 size={18} />
          </ToolBtn>

          <ToolBtn
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            active={editor?.isActive("heading", { level: 2 })}
          >
            <Heading2 size={18} />
          </ToolBtn>

          <ToolBtn
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            active={editor?.isActive("heading", { level: 3 })}
          >
            <Heading3 size={18} />
          </ToolBtn>

          <ToolBtn
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor?.isActive("bulletList")}
          >
            <List size={18} />
          </ToolBtn>

          <ToolBtn
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor?.isActive("orderedList")}
          >
            <ListOrdered size={18} />
          </ToolBtn>
        </div>

        {/* EDITOR */}
        <div className="p-5 min-h-[300px] prose max-w-none">
          <EditorContent editor={editor} />
        </div>
      </div>

      {/* ===== ACTION ===== */}
      <button
        onClick={handleSave}
        className="w-full bg-[#6B4FA3] text-white px-6 py-3 rounded-lg font-semibold hover:scale-[1.02] transition"
      >
        Save & Next →
      </button>
    </div>
  );
};

export default AdminSEO;