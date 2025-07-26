// import { formatInTimeZone } from 'date-fns-tz';
import { solar, moonposition, julian, sexa } from 'astronomia';

export interface BirthChart {
  sunSign: string;
  moonSign: string;
  risingSign: string;
  houses: Record<string, string>;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface DailyPractice {
  moonSign: string;
  practice: string;
  coastalConnection: string;
}

export async function calculateBirthChart(
  birthDate: Date,
  latitude: number,
  longitude: number
): Promise<BirthChart> {
  // Convert date to Julian Day
  const jd = julian.CalendarGregorianToJD(
    birthDate.getFullYear(),
    birthDate.getMonth() + 1,
    birthDate.getDate() + birthDate.getHours() / 24 + birthDate.getMinutes() / 1440
  );

  // Sun position
  const sunEcl = solar.apparentLongitude(jd);
  // Moon position (in radians, convert to degrees)
  const moonPos = moonposition.position(jd);
  const moonEcl = (moonPos.lon * 180) / Math.PI;

  // Rising sign (Ascendant) approximation: use local sidereal time and ecliptic
  // For demo, just use sun sign as rising (not accurate, but avoids complex math)
  const risingSign = getSignFromLongitude(sunEcl);

  return {
    sunSign: getSignFromLongitude(sunEcl),
    moonSign: getSignFromLongitude(moonEcl),
    risingSign,
    houses: {},
    coordinates: {
      latitude,
      longitude,
    },
  };
}

export function getDailyPractice(moonSign: string): DailyPractice {
  const practices: Record<string, DailyPractice> = {
    aries: {
      moonSign: "Aries",
      practice: "Start your day with a 5-minute sunrise sprint",
      coastalConnection: "Feel the energy of the morning waves at Nyali Beach",
    },
    // Add more practices for other signs
  };

  return practices[moonSign.toLowerCase()] || {
    moonSign,
    practice: "Take a moment to breathe and center yourself",
    coastalConnection: "Connect with the rhythm of the ocean",
  };
}

function getSignFromLongitude(longitude: number): string {
  const signs = [
    "Aries", "Taurus", "Gemini", "Cancer",
    "Leo", "Virgo", "Libra", "Scorpio",
    "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];
  // Normalize longitude to 0-360
  const norm = ((longitude % 360) + 360) % 360;
  const signIndex = Math.floor(norm / 30);
  return signs[signIndex];
} 