import { useEffect, useRef, useState } from "react";
import {
  FaMapMarkerAlt,
  FaClock,
  FaEnvelope,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";
import Confetti from "react-confetti";
import backgroundImg from "./assets/wedding-bg.jpg";
import coupleImg from "./assets/couple.jpeg";
import weddingAudio from "./assets/wedding-sound.mp3";

function App() {
  const [loading, setLoading] = useState(true);
  const [showTimer, setShowTimer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);

  // Loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setShowTimer(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Countdown timer
  useEffect(() => {
    const weddingDate = new Date(2026, 3, 2, 19, 0, 0).getTime();

    const interval = setInterval(() => {
      setTimeLeft(weddingDate - Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Play / Pause audio
  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Audio play failed:", error);
      }
    }
  };

  const days = Math.max(0, Math.floor(timeLeft / (1000 * 60 * 60 * 24)));
  const hours = Math.max(0, Math.floor((timeLeft / (1000 * 60 * 60)) % 24));
  const minutes = Math.max(0, Math.floor((timeLeft / (1000 * 60)) % 60));
  const seconds = Math.max(0, Math.floor((timeLeft / 1000) % 60));

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#3c2f2f]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#d1a77c] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h1 className="text-white text-xl animate-pulse">
            Loading Engagement 🎉
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="relative font-sans min-h-screen overflow-x-hidden">
      {/* Audio */}
      <audio ref={audioRef} loop>
        <source src={weddingAudio} type="audio/mpeg" />
      </audio>

      {/* Fixed Music Button */}
      <button
        onClick={toggleMusic}
        className="fixed top-5 right-5 z-50 bg-[#a66940] text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition duration-300"
      >
        {isPlaying ? (
          <FaVolumeUp className="text-2xl" />
        ) : (
          <FaVolumeMute className="text-2xl" />
        )}
      </button>

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
        colors={["#e6ccb2", "#c79a74", "#a66940", "#f0e5d8"]}
      />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-4 py-20 text-center text-white z-10 gap-4">
        <img
          src={coupleImg}
          alt="Couple"
          className="w-48 md:w-64 rounded-full shadow-2xl animate-pulse-btn"
        />

        <div className="relative bg-[#a66940]/90 p-6 md:p-10 rounded-2xl max-w-xl w-full shadow-2xl flex flex-col gap-4">
          <p className="text-lg md:text-2xl leading-snug text-[#f0e5d8]">
            <span className="font-bold">Save the Date</span>
            <br />
            to join our
            <br />
            <span className="font-bold">Engagement Party</span>
          </p>

          <h1 className="font-heading text-4xl md:text-6xl font-bold text-[#f0e5d8] leading-tight mt-2">
            Mohamed
            <span>
              <br /> &
            </span>
            <br />
            Salma
          </h1>

          <p className="text-md md:text-lg text-[#f5f1ed] mt-2">
            Thursday 2 April 2026
          </p>
          <p className="text-md md:text-lg text-[#f5f1ed]">
            Don't forget to drink your{" "}
            <span className="font-bold">عصير العنب</span> before you come. 🍇
          </p>
        </div>
      </section>

      {/* Countdown Timer Section */}
      {showTimer && (
        <section className="flex flex-col items-center py-10 gap-6">
          <div className="bg-[#a66940]/90 backdrop-blur-md px-6 py-6 rounded-2xl shadow-2xl flex flex-col items-center gap-6 max-w-xl w-full">
            {/* Text above timer */}
            <div className="text-center text-white">
              <p className="text-lg md:text-xl leading-snug">
                <span className="font-bold">The countdown begins</span>
                <br />
                <span className="font-bold">See you soon</span>
              </p>
            </div>

            {/* Timer */}
            <div className="flex gap-4 flex-wrap justify-center">
              {[
                { label: "Days", value: days },
                { label: "Hours", value: hours },
                { label: "Min", value: minutes },
                { label: "Sec", value: seconds },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#f0e5d8] text-[#a66940] px-4 py-3 rounded-lg shadow-md flex flex-col items-center min-w-[70px]"
                >
                  <span className="text-lg md:text-xl font-bold">
                    {item.value}
                  </span>
                  <span className="text-xs md:text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Engagement Details */}
      <section className="py-12 px-4 flex flex-col items-center gap-8 relative z-10">
        <div className="bg-[#a66940]/90 p-6 md:p-10 rounded-2xl text-center text-white max-w-md w-full shadow-2xl">
          <h2 className="text-3xl font-bold text-[#f0e5d8] mb-5">
            Engagement Details
          </h2>

          <p className="flex items-center justify-center text-lg mb-1 gap-2">
            <FaMapMarkerAlt className="text-2xl" />
            <span className="font-bold">Riviera Hall - Alharm</span>
          </p>

          <p className="text-lg mb-4 text-[#f5f1ed]">
            at the Pyramids Palace Officers Club
          </p>

          <p className="text-lg flex items-center justify-center gap-2 mb-4 text-[#f5f1ed]">
            <FaClock /> 7:00 PM
          </p>

          <a
            href="https://maps.app.goo.gl/EG16MKqhCPWsds969?g_st=ac"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#d1a77c] text-white rounded-full hover:bg-[#b08968] transition inline-block mt-2"
          >
            Open Map
          </a>
        </div>
      </section>

      {/* Engagement Message Card */}
      <section className="flex flex-col items-center py-6 pb-16">
        <div className="bg-[#a66940]/90 p-6 md:p-10 rounded-2xl text-center text-white max-w-md w-full shadow-2xl space-y-4">
          <p className="text-lg md:text-xl leading-snug">
            <span className="font-bold">Help us create our memories</span>
            <br />
            <span className="font-bold">with kind words</span>
          </p>

          <a
            href="https://forms.gle/Qxd7KyVpmESojyo88"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-[#d1a77c] text-white rounded-full hover:bg-[#b08968] transition inline-block mt-2"
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
