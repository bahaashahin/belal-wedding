import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaClock, FaEnvelope } from "react-icons/fa";
import Confetti from "react-confetti";
import backgroundImg from "./assets/wedding-bg.jpg";
import coupleImg from "./assets/couple.jpeg"; // صورة العروسين
import weddingAudio from "./assets/wedding-sound.mp3";

function App() {
  const [loading, setLoading] = useState(true);
  const [showTimer, setShowTimer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  // Audio setup
  useEffect(() => {
    const audio = new Audio(weddingAudio);
    audio.loop = true;
    setTimeout(() => {
      setLoading(false);
      setShowTimer(true);
      audio.play().catch(() => console.log("Autoplay blocked"));
    }, 2500);
  }, []);

  // Timer
  useEffect(() => {
    const weddingDate = new Date(2026, 3, 2, 19, 0, 0).getTime();
    const interval = setInterval(() => {
      setTimeLeft(weddingDate - Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#b08968] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-white text-xl animate-pulse">
            Loading Engagement 🎉
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="relative font-sans min-h-screen overflow-x-hidden">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center -z-10"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      ></div>

      {/* Confetti */}
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={true}
        numberOfPieces={150}
        gravity={0.2}
        colors={["#e6ccb2", "#b08968", "#9c6644", "#ede0d4"]}
      />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-4 py-20">
        {/* صورة العروسين */}
        <img
          src={coupleImg}
          alt="Couple"
          className="w-48 md:w-64 rounded-full shadow-2xl mb-6 animate-pulse-btn"
        />

        {/* Floating lights */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 rounded-full bg-[#ede0d4] animate-float`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            ></div>
          ))}
        </div>

        <div className="relative bg-[#9c6644]/90 p-6 md:p-10 rounded-2xl text-center text-white max-w-xl w-full shadow-2xl z-10">
          <h1 className="font-heading text-3xl md:text-6xl font-bold mb-4 text-[#ede0d4]">
            Mohamed
            <span>
              <br />&
            </span>
            <br />
            Salma
          </h1>
          <p className="text-lg md:text-2xl mb-2">
            You're Invited to Our Engagement
          </p>
          <p className="text-md md:text-lg mb-6">2 April 2026</p>
          <a
            href="https://maps.app.goo.gl/EG16MKqhCPWsds969?g_st=ac"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 md:px-8 md:py-3 bg-[#b08968] rounded-full hover:bg-[#a17a55] transition inline-block animate-pulse-btn"
          >
            View Location
          </a>
        </div>
      </section>

      {/* Countdown Timer Section */}
      {showTimer && (
        <section className="flex justify-center py-10">
          <div className="bg-[#b08968]/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg flex gap-4 animate-bounce-slow">
            {[
              { label: "Days", value: days },
              { label: "Hours", value: hours },
              { label: "Min", value: minutes },
              { label: "Sec", value: seconds },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#ede0d4] text-[#9c6644] px-4 py-3 rounded-lg shadow-md flex flex-col items-center min-w-[60px] animate-pulse"
              >
                <span className="text-lg md:text-xl font-bold">
                  {item.value}
                </span>
                <span className="text-xs md:text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Engagement Details in Box */}
      <section className="py-12 px-4 flex flex-col items-center gap-8 relative z-10">
        <div className="bg-[#9c6644]/90 p-6 md:p-10 rounded-2xl text-center text-white max-w-md w-full shadow-2xl">
          <h2 className="text-3xl font-bold text-[#ede0d4] mb-5">
            Engagement Details
          </h2>

          {/* Icon next to bold text */}
          <p className="flex items-center justify-center text-lg mb-1 gap-2">
            <FaMapMarkerAlt className="text-2xl" />
            <span className="font-bold">Riviera Hall - Alharm</span>
          </p>

          {/* Subtitle below */}
          <p className="text-lg mb-4">at the Pyramids Palace Officers Club</p>

          {/* Time */}
          <p className="text-lg flex items-center justify-center gap-2 mb-4">
            <FaClock /> 7:00 PM
          </p>

          {/* Map Button */}
          <a
            href="https://maps.app.goo.gl/EG16MKqhCPWsds969?g_st=ac"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#b08968] text-white rounded-full hover:bg-[#a17a55] transition inline-block mt-2"
          >
            Open Map
          </a>
        </div>

        {/* Leave a Message Box */}
        <div className="bg-[#9c6644]/90 p-6 md:p-10 rounded-2xl text-center text-white max-w-md w-full shadow-2xl space-y-4">
          <h2 className="text-2xl font-bold text-[#ede0d4]">سيبلنا مسدج هنا</h2>
          <a
            href="https://forms.gle/YOUR_GOOGLE_FORM_LINK"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#b08968] text-white rounded-full hover:bg-[#a17a55] transition inline-block mt-2"
          >
            Leave a Message <FaEnvelope className="inline ml-2" />
          </a>
        </div>
      </section>

      {/* Animations */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); opacity: 0.6; }
          50% { transform: translateY(-20px); opacity: 1; }
          100% { transform: translateY(0px); opacity: 0.6; }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }

        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow { animation: bounceSlow 2s infinite; }

        @keyframes pulseBtn {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-pulse-btn { animation: pulseBtn 2s infinite; }
      `}</style>
    </div>
  );
}

export default App;
