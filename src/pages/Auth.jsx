import { useState } from "react";
import google from "../assets/Google__G__Logo.svg.png";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from "firebase/auth";
import { auth, provider } from "../firebase/config";
import { toast } from "react-toastify";
const Auth = () => {
  const [signUp, setSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const pass = e.target[1].value;

    if (signUp) {
      // kaydol > kullanıcı oluşturucaz
      createUserWithEmailAndPassword(auth, email, pass).catch((err) =>
        toast.error(err.code)
      );
    } else {
      // giriş yap > varolan hesaba giriş
      signInWithEmailAndPassword(auth, email, pass).catch((err) => {
        toast.error(err.code);
        // şifre hatası varsa state'i güncelle
        if (err.code === "auth/invalid-login-credentials") {
          setIsError(true);
        }
      });
    }
  };

  // şifre sıfırlar
  const handleReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => toast.info("Lütfen Mailinizi kontrol edin."))
      .catch((err) => toast.error(err.code));
  };

  const handleGoogle = () => {
    signInWithRedirect(auth, provider).catch((err) => toast.error(err.code));
  };
  return (
    <div className="h-[100vh] bg-zinc-800 grid place-items-center">
      <div className="bg-black text-white flex flex-col gap-10 py-16 px-32 rounded-lg">
        <div className="flex justify-center">
          <img className="h-[60px]" src="/public/x-logo.webp" alt="" />
        </div>

        <h1 className="text-center font-bold text-xl">X'e giriş yap</h1>

        <div
          onClick={handleGoogle}
          className="flex items-center gap-3 bg-white text-black py-2 px-10 rounded-full cursor-pointer hover:bg-gray-200"
        >
          <img className="h-[20px]" src={google} />
          <p className="whitespace-nowrap">Google ile giriş yap</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="mb-2">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="text-black rounded  p-2 shadow-lg  outline"
            type="email"
          />

          <label className="mt-5 mb-2">Şifre</label>
          <input
            className="text-black rounded p-2 shadow-lg outline"
            type="password"
          />

          <button
            className="bg-white text-black mt-10 rounded-full p-1 font-bold transition hover:bg-gray-200"
            type="submit"
          >
            {signUp ? "Kaydol" : "Giriş Yap"}
          </button>

          <p className="text-gray-500 mt-5">
            <span>Hesabınız yok mu?</span>
            <button
              onClick={() => setSignUp(!signUp)}
              className="mx-3 text-blue-500"
              type="button"
            >
              {signUp ? "Giriş Yap" : "Kaydol"}
            </button>
          </p>

          {/* kullanıcı giriş yap modundaysa ve hata varsa gözükür */}
          {!signUp && isError && (
            <button
              type="button"
              className="text-red-400 mt-5"
              onClick={handleReset}
            >
              Şifrenii unuttun mu?
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Auth;
