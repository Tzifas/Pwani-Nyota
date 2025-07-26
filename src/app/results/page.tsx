'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { calculateBirthChart, getDailyPractice } from '@/lib/astrology';
import { astrologicalSigns, spiritualStones } from '@/lib/data';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { BirthChartPDF } from '@/components/BirthChartPDF';
import { motion, AnimatePresence } from 'framer-motion';

const blessings = [
  {
    proverb: "Bahari tulivu haimtoi nahodha.",
    translation: "A calm sea does not make a skilled sailor.",
    tip: "Embrace challenges for growth."
  },
  {
    proverb: "Subira huvuta heri.",
    translation: "Patience brings blessings.",
    tip: "Take a moment to reflect before acting today."
  },
  {
    proverb: "Pole pole ndiyo mwendo.",
    translation: "Slow and steady wins the race.",
    tip: "Move with intention and grace."
  },
  {
    proverb: "Haraka haraka haina baraka.",
    translation: "Haste has no blessing.",
    tip: "Pause and breathe before making decisions."
  },
];

function getRandomBlessing() {
  return blessings[Math.floor(Math.random() * blessings.length)];
}

export default function Results() {
  const router = useRouter();
  const [birthChart, setBirthChart] = useState<any>(null);
  const [dailyPractice, setDailyPractice] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [blessing] = useState(getRandomBlessing());

  useEffect(() => {
    const loadBirthData = async () => {
      const storedData = localStorage.getItem('birthData');
      if (!storedData) {
        router.push('/');
        return;
      }

      const { dateTime, coordinates } = JSON.parse(storedData);
      try {
        const chart = await calculateBirthChart(
          new Date(dateTime),
          coordinates.latitude,
          coordinates.longitude
        );
        setBirthChart(chart);
        setDailyPractice(getDailyPractice(chart.moonSign));
      } catch (error) {
        console.error('Error calculating birth chart:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBirthData();
  }, [router]);

  if (loading) {
    return <ConstellationSpinner sign="Libra" />;
  }

  const recommendedStones = spiritualStones.filter(stone =>
    stone.associatedSigns.includes(birthChart.risingSign)
  );

  // Share handler
  const shareText = `My PwaniNyota Cosmic Profile: Sun: ${birthChart.sunSign}, Moon: ${birthChart.moonSign}, Rising: ${birthChart.risingSign}. #PwaniNyota`;
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: "PwaniNyota Astrology", text: shareText, url: shareUrl });
    } else {
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      alert("Link copied! Share your cosmic wisdom.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-900 to-purple-900 text-white p-4 sm:p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl mx-auto space-y-8">
        {/* Animated Sign Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-white/10 rounded-xl p-6 shadow-lg backdrop-blur"
        >
          <h1 className="text-3xl font-bold text-center mb-4">Your Coastal Cosmic Chart</h1>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <SignReveal
              label="Sun Sign"
              value={birthChart.sunSign}
              sw={astrologicalSigns[birthChart.sunSign.toLowerCase()]?.name.sw}
              color="text-yellow-300"
            />
            <SignReveal
              label="Moon Sign"
              value={birthChart.moonSign}
              sw={astrologicalSigns[birthChart.moonSign.toLowerCase()]?.name.sw}
              color="text-blue-200"
            />
            <SignReveal
              label="Rising Sign"
              value={birthChart.risingSign}
              sw={astrologicalSigns[birthChart.risingSign.toLowerCase()]?.name.sw}
              color="text-pink-200"
            />
          </div>
        </motion.div>

        {/* Stone Reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="bg-white/10 rounded-xl p-6 shadow-lg backdrop-blur"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Jiwe lako la Pwani (Your Coastal Stone)</h2>
          <div className="flex flex-wrap gap-6 justify-center">
            {recommendedStones.map((stone, i) => (
              <motion.div
                key={stone.name}
                className="animate-fade-in bg-gradient-to-br from-coral to-beach-wave2 p-4 rounded-2xl flex flex-col items-center shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.2, duration: 0.7 }}
              >
                <div className="h-14 w-14 bg-amber-400 rounded-full animate-pulse mb-2 border-4 border-white shadow-lg" />
                <p className="font-bold text-lg text-teal-100 mb-1">{stone.name}</p>
                <p className="text-white text-sm mb-1">{stone.description}</p>
                <p className="text-xs text-white/80 italic">{stone.coastalImagery}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Daily Practice & Blessing */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="bg-white/10 rounded-xl p-6 shadow-lg backdrop-blur"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Daily Blessing</h2>
          <div className="text-center mb-4">
            <p className="text-lg font-semibold text-coral">{blessing.proverb}</p>
            <p className="text-sm text-white/80 italic mb-2">{blessing.translation}</p>
            <p className="text-md text-white/90">{blessing.tip}</p>
          </div>
          <div className="text-center mt-4">
            <p className="text-lg font-bold mb-1">Practice / Zoezi la Siku</p>
            <p className="text-white text-md mb-1">{dailyPractice.practice}</p>
            <p className="text-xs text-white/80 italic">{dailyPractice.coastalConnection}</p>
          </div>
        </motion.div>

        {/* Share Button & PDF */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
          <motion.button
            whileHover={{ scale: 1.08, boxShadow: "0 0 16px #FF7F50" }}
            whileTap={{ scale: 0.97 }}
            onClick={handleShare}
            className="bg-coral text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
          >
            Share Your Cosmic Wisdom
          </motion.button>
          <PDFDownloadLink
            document={<BirthChartPDF birthChart={birthChart} dailyPractice={dailyPractice} recommendedStones={recommendedStones} />}
            fileName="birth-chart.pdf"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors inline-block"
          >
            {({ loading }) => (loading ? "Generating PDF..." : "Download Birth Chart PDF")}
          </PDFDownloadLink>
        </div>
      </div>
    </main>
  );
}

function SignReveal({ label, value, sw, color }: { label: string; value: string; sw: string; color: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="flex flex-col items-center bg-gradient-to-br from-beach-wave1 to-beach-sand rounded-xl p-4 shadow-md min-w-[120px]"
    >
      <span className={`text-lg font-bold ${color}`}>{label}</span>
      <span className="text-2xl font-extrabold text-white drop-shadow-lg">{value}</span>
      <span className="text-sm text-white/80 italic">{sw}</span>
    </motion.div>
  );
}

function ConstellationSpinner({ sign }: { sign: string }) {
  // Libra constellation SVG (as an example)
  const points = [
    { cx: 30, cy: 60 },
    { cx: 40, cy: 40 },
    { cx: 60, cy: 40 },
    { cx: 70, cy: 60 },
    { cx: 50, cy: 80 },
  ];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-purple-900">
      <svg width="120" height="120" viewBox="0 0 100 100" className="mb-6">
        {/* Lines */}
        <polyline
          points={points.map((p) => `${p.cx},${p.cy}`).join(" ")}
          fill="none"
          stroke="#FF7F50"
          strokeWidth="2"
        />
        {/* Dots */}
        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.cx}
            cy={p.cy}
            r={6}
            fill="#fff"
            initial={{ opacity: 0.3, scale: 0.7 }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.7, 1.2, 0.7] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </svg>
      <p className="text-white text-lg font-bold animate-pulse">Calculating your cosmic connection...</p>
      <p className="text-coral text-sm mt-2 italic">Subira huvuta heri. (Patience brings blessings.)</p>
    </div>
  );
} 