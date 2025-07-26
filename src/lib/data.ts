export interface AstrologicalSign {
  name: {
    en: string;
    sw: string;
  };
  element: string;
  quality: string;
  ruler: string;
  dates: string;
}

export interface SpiritualStone {
  name: string;
  description: string;
  benefits: string[];
  associatedSigns: string[];
  coastalImagery: string;
}

export const astrologicalSigns: Record<string, AstrologicalSign> = {
  aries: {
    name: {
      en: "Aries",
      sw: "Hamali",
    },
    element: "Fire",
    quality: "Cardinal",
    ruler: "Mars",
    dates: "March 21 - April 19",
  },
  taurus: {
    name: {
      en: "Taurus",
      sw: "Njati",
    },
    element: "Earth",
    quality: "Fixed",
    ruler: "Venus",
    dates: "April 20 - May 20",
  },
  // Add other signs here
};

export const spiritualStones: SpiritualStone[] = [
  {
    name: "Tiger's Eye",
    description: "A powerful stone of protection and courage",
    benefits: [
      "Enhances courage and confidence",
      "Promotes balance and harmony",
      "Protects against negative energy",
    ],
    associatedSigns: ["Libra", "Leo"],
    coastalImagery: "Like the golden sands of Diani Beach at sunset",
  },
  // Add more stones here
]; 