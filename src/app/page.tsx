'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const periods = [
  { label: "Morning", value: "06:00" },
  { label: "Afternoon", value: "13:00" },
  { label: "Evening", value: "18:00" },
  { label: "Night", value: "22:00" },
];

const proverbs = [
  "Haraka haraka haina baraka.", // Haste has no blessing.
  "Subira huvuta heri.", // Patience brings blessings.
  "Pole pole ndiyo mwendo.", // Slow and steady wins the race.
  "Usikate tamaa, mambo mazuri huchukua muda.", // Don't give up, good things take time.
];

function getRandomProverb() {
  return proverbs[Math.floor(Math.random() * proverbs.length)];
}

export default function Home() {
  const router = useRouter();
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [period, setPeriod] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);

  // Autofill sample data and submit
  const autofill = () => {
    setBirthDate('2005-10-15');
    setBirthTime('03:58');
    setPeriod('');
    setLocation('Mombasa');
    setError('');
    setShowError(false);
    setTimeout(() => {
      document.getElementById('birth-form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }, 300);
  };

  // Handle time input (either exact or period)
  const getFinalTime = () => {
    if (birthTime) return birthTime;
    if (period) return period;
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthDate || (!birthTime && !period) || !location) {
      setError(getRandomProverb());
      setShowError(true);
      return;
    }
    setShowError(false);
    const dateTime = new Date(`${birthDate}T${getFinalTime()}`);
    
    // In a real app, we would geocode the location to get coordinates
    // For now, we'll use Mombasa's coordinates as default
    const coordinates = {
      latitude: -4.0435,
      longitude: 39.6682
    };

    // Store the data in localStorage for the results page
    localStorage.setItem('birthData', JSON.stringify({
      dateTime,
      coordinates,
      location
    }));

    router.push('/results');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic SVG Star Background */}
      <StarBackground />
      <main className="relative z-10 w-full max-w-md mx-auto p-4 sm:p-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 rounded-2xl shadow-xl p-6 sm:p-10 backdrop-blur-md border border-beach-wave1"
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-2 text-white drop-shadow-lg">
            PwaniNyota Astrology
          </h1>
          <p className="text-center text-white/80 mb-6">
            Discover your cosmic connection with the coastal wisdom of Africa
          </p>

          <form id="birth-form" onSubmit={handleSubmit} className="space-y-6">
            {/* Birth Date */}
            <AnimatedInput
              label="Birth Date"
              type="date"
              value={birthDate}
              onChange={setBirthDate}
              placeholder="Select date"
            />
            {/* Time Input or Period */}
            <div>
              <label className="block text-white font-semibold mb-2">
                Birth Time
              </label>
              <div className="flex gap-2">
                <AnimatedInput
                  label=""
                  type="time"
                  value={birthTime}
                  onChange={setBirthTime}
                  placeholder="Exact time"
                  className="flex-1"
                />
                <span className="text-white/70 self-center">or</span>
                <select
                  className="flex-1 rounded-lg border-2 border-beach-wave1 bg-white/20 text-white p-2 focus:outline-none focus:border-coral transition-all duration-300"
                  value={period}
                  onChange={(e) => {
                    setPeriod(e.target.value);
                    setBirthTime('');
                  }}
                >
                  <option value="">Period</option>
                  {periods.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Location */}
            <AnimatedInput
              label="Birth Location"
              type="text"
              value={location}
              onChange={setLocation}
              placeholder="Mombasa, Lamu, Zanzibar..."
            />
            {/* Error Message */}
            {showError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-coral/80 text-white text-center rounded-lg py-2 px-4 animate-fade-in mb-2 shadow-lg"
          >
                <span className="font-bold">{error}</span>
              </motion.div>
            )}
            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 16px #FF7F50' }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 rounded-lg font-bold text-lg bg-coral text-white shadow-md transition-all duration-300 relative overflow-hidden"
            >
              <span className="relative z-10">Calculate Birth Chart</span>
              <SparkleEffect />
            </motion.button>
            {/* Sample Button */}
            <button
              type="button"
              onClick={autofill}
              className="w-full mt-2 py-2 rounded-lg font-semibold text-coral bg-white/20 border-2 border-coral hover:bg-coral hover:text-white transition-colors duration-300"
          >
              Sample Coastal Chart
            </button>
          </form>
        </motion.div>
      </main>
    </div>
  );
}

// Animated Input Component
function AnimatedInput({ label, type, value, onChange, placeholder, className = '' }: any) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-white font-semibold mb-2">{label}</label>
      )}
      <motion.input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border-2 border-beach-wave1 bg-white/20 text-white p-2 focus:outline-none focus:border-coral transition-all duration-300 animate-wave-border"
        whileFocus={{ borderColor: '#FF7F50' }}
        whileHover={{ borderColor: '#20B2AA' }}
      />
    </div>
  );
}

// Sparkle Effect for Button
function SparkleEffect() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0.7 }}
      animate={{ opacity: [0.7, 1, 0.7] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
    >
      <svg width="100%" height="100%" className="absolute inset-0">
        <circle cx="20%" cy="40%" r="6" fill="#fff" opacity="0.9">
          <animate attributeName="r" values="6;12;6" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="80%" cy="60%" r="4" fill="#fff" opacity="0.7">
          <animate attributeName="r" values="4;10;4" dur="1.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="50%" cy="80%" r="3.5" fill="#fff" opacity="0.8">
          <animate attributeName="r" values="3.5;8;3.5" dur="1.8s" repeatCount="indefinite" />
        </circle>
      </svg>
    </motion.div>
  );
}

// Dynamic SVG Star Background
function StarBackground() {
  // Get time of day for color
  const hour = new Date().getHours();
  let bgGradient = '#0a174e, #1e2959'; // default night
  if (hour >= 5 && hour < 8) bgGradient = '#fbbf24, #1e2959'; // dawn
  else if (hour >= 8 && hour < 17) bgGradient = '#87ceeb, #fbbf24'; // day
  else if (hour >= 17 && hour < 19) bgGradient = '#fbbf24, #0a174e'; // dusk

  // Generate random stars (bigger, brighter, parallax)
  const stars = Array.from({ length: 80 }, (_, i) => ({
    cx: Math.random() * 100,
    cy: Math.random() * 100,
    r: Math.random() * 2.5 + 1.5,
    twinkle: Math.random() > 0.3,
    delay: Math.random() * 2,
    opacity: Math.random() * 0.5 + 0.5,
  }));

  return (
    <svg
      className="fixed inset-0 w-full h-full z-0"
      style={{ background: `linear-gradient(135deg, ${bgGradient})` }}
      width="100%"
      height="100%"
      preserveAspectRatio="none"
    >
      {stars.map((star, i) => (
        <circle
          key={i}
          cx={`${star.cx}%`}
          cy={`${star.cy}%`}
          r={star.r}
          fill="#fff"
          opacity={star.opacity}
        >
          {star.twinkle && (
            <animate
              attributeName="opacity"
              values="0.3;1;0.3"
              dur="2s"
              repeatCount="indefinite"
              begin={`${star.delay}s`}
            />
          )}
        </circle>
      ))}
    </svg>
  );
}
