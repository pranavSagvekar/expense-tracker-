import { auth, provider } from '../../config/firebase.config.js';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate, Navigate } from 'react-router-dom';
import { useGetuserInfo } from "../../hooks/useGetuserInfo";
import { FcGoogle } from "react-icons/fc";

function Auth() {
  const { isAuth } = useGetuserInfo();
  const navigate = useNavigate();

  if (isAuth) {
    return <Navigate to="/expense-tracker" />;
  }

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      if (!result || !result.user) {
        throw new Error("User info is missing from the result.");
      }

      const authInfo = {
        userID: result.user.uid,
        name: result.user.displayName,
        profilePhoto: result.user.photoURL,
        isAuth: true,
      };

      localStorage.setItem("auth", JSON.stringify(authInfo));
      navigate("/expense-tracker");
    } catch (error) {
      console.error("Google sign-in failed:", error);
      alert("Sign-in failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 to-pink-200">
      <div className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Welcome to Expense Tracker</h1>
        <p className="mb-6 text-gray-600">Sign in with Google to continue</p>
        
        <button
          onClick={signInWithGoogle}
          className="flex items-center justify-center gap-3 bg-white text-gray-700 border border-gray-300 shadow hover:shadow-lg hover:bg-gray-50 transition-all duration-300 py-2 px-4 rounded-lg w-full"
        >
          <FcGoogle size={22} />
          <span className="font-medium">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}

export default Auth;
