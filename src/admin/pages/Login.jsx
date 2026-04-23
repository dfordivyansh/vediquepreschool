import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) return alert("Enter credentials");

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      alert("Invalid email or password");
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: "radial-gradient(circle at top left, #E6E0F8, #D7C7F2)",
      }}
    >
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-white/40">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-6 text-[#b62474] font-[Chewy]">
          Vedique Admin
        </h2>

        {/* Subtitle */}
        <p className="text-center text-[#3A216A] mb-6 font-semibold">
          Welcome back! Login to continue ✨
        </p>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b62474]"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b62474]"
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 text-lg font-bold rounded-xl text-white shadow-md transition cursor-pointer"
          style={{
            background: "linear-gradient(to bottom, #E38342, #FFC107)",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Footer */}
        <p className="text-center text-sm mt-6 text-gray-600">
          Vedique Preschool Admin Panel
        </p>
      </div>
    </div>
  );
};

export default Login;