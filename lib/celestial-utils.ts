import SunCalc from "suncalc";
import { format } from "date-fns";

// Calculate moon phase and information based on date
export function getMoonPhase(date: Date) {
  // Get SunCalc moon illumination data
  const moonIllumination = SunCalc.getMoonIllumination(date);
  const { phase, angle, fraction } = moonIllumination;

  // Get moon rise/set times
  const moonTimes = SunCalc.getMoonTimes(date, 40.7128, -74.0060); // Default to NYC coordinates
  
  // Format moonrise/set times if available
  const moonrise = moonTimes.rise 
    ? format(moonTimes.rise, "h:mm a") 
    : null;
  
  const moonset = moonTimes.set 
    ? format(moonTimes.set, "h:mm a") 
    : null;

  // Determine moon phase name based on phase value (0 to 1)
  let phaseName = "";
  let phaseDescription = "";
  
  if (phase < 0.0625 || phase >= 0.9375) {
    phaseName = "New Moon";
    phaseDescription = "A time of new beginnings and fresh starts. The sky is dark as the moon is not visible.";
  } else if (phase < 0.1875) {
    phaseName = "Waxing Crescent";
    phaseDescription = "A time of growth and intention-setting. A sliver of the moon is visible, growing each night.";
  } else if (phase < 0.3125) {
    phaseName = "First Quarter";
    phaseDescription = "A time of action and decision-making. Half of the moon is visible, increasing in light.";
  } else if (phase < 0.4375) {
    phaseName = "Waxing Gibbous";
    phaseDescription = "A time of refinement and perfection. The moon is more than half lit, approaching fullness.";
  } else if (phase < 0.5625) {
    phaseName = "Full Moon";
    phaseDescription = "A time of culmination and illumination. The entire face of the moon is visible and brightly lit.";
  } else if (phase < 0.6875) {
    phaseName = "Waning Gibbous";
    phaseDescription = "A time of gratitude and sharing. The moon is still mostly lit but beginning to decrease.";
  } else if (phase < 0.8125) {
    phaseName = "Last Quarter";
    phaseDescription = "A time of release and letting go. Half of the moon is visible, decreasing in light.";
  } else {
    phaseName = "Waning Crescent";
    phaseDescription = "A time of surrender and rest. Only a sliver of the moon is visible, fading each night.";
  }

  // Convert SunCalc angle to more standard 0-360 degree phase angle
  // where 0/360 = new moon, 90 = first quarter, 180 = full moon, 270 = last quarter
  const phaseAngle = ((phase * 360) + 180) % 360;

  return {
    phase: phaseName,
    phaseAngle,
    illumination: fraction,
    description: phaseDescription,
    moonrise: moonrise || "Not visible",
    moonset: moonset || "Not visible",
  };
}

// Get zodiac sign based on birth date
export function getZodiacSign(date: Date) {
  const day = date.getDate();
  const month = date.getMonth() + 1; // JS months are 0-indexed
  
  let sign = "";
  let symbol = "";
  let element = "";
  let description = "";
  
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    sign = "Aries";
    symbol = "♈";
    element = "Fire";
    description = "Aries are known for their energy, courage, and pioneering spirit. As the first sign of the zodiac, they embody new beginnings and possess a bold, competitive nature. Aries individuals are natural leaders who approach life with enthusiasm and directness.";
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    sign = "Taurus";
    symbol = "♉";
    element = "Earth";
    description = "Taurus individuals are known for their reliability, practicality, and love of comfort and luxury. They are grounded, patient, and have a strong connection to the physical world. Taureans value stability and are often determined and persistent in pursuing their goals.";
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    sign = "Gemini";
    symbol = "♊";
    element = "Air";
    description = "Geminis are curious, adaptable, and intellectually driven. They possess excellent communication skills and enjoy learning about diverse subjects. Their dual nature gives them versatility but can also make them seem inconsistent. Geminis thrive on mental stimulation and social interaction.";
  } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    sign = "Cancer";
    symbol = "♋";
    element = "Water";
    description = "Cancers are deeply intuitive, emotional, and caring individuals. They have strong connections to home and family and often act as protectors of those they love. Their sensitivity gives them empathy, but they can also be moody and withdraw into their shells when feeling threatened.";
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    sign = "Leo";
    symbol = "♌";
    element = "Fire";
    description = "Leos are confident, dramatic, and passionate individuals who naturally draw attention. They have big hearts, generous spirits, and love being in the spotlight. Their warmth and creativity make them natural leaders, though they can sometimes struggle with pride and ego.";
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    sign = "Virgo";
    symbol = "♍";
    element = "Earth";
    description = "Virgos are analytical, practical, and detail-oriented. They strive for perfection and have a natural ability to see how things could be improved. Their methodical approach and service-oriented nature make them excellent problem-solvers, though they can be overly critical of themselves and others.";
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    sign = "Libra";
    symbol = "♎";
    element = "Air";
    description = "Libras seek harmony and balance in all areas of life. They have a strong sense of justice and are natural diplomats and peacemakers. Their appreciation for beauty and charm makes them pleasant companions, though they can sometimes be indecisive due to their desire to see all perspectives.";
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    sign = "Scorpio";
    symbol = "♏";
    element = "Water";
    description = "Scorpios are intense, passionate, and deeply emotional. They have penetrating minds and powerful intuition that allows them to see beyond surface appearances. Their determination and resourcefulness help them overcome challenges, though their secretive nature can sometimes appear mysterious to others.";
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    sign = "Sagittarius";
    symbol = "♐";
    element = "Fire";
    description = "Sagittarians are optimistic, freedom-loving, and philosophical. They have a thirst for knowledge and new experiences that often leads them to travel and explore. Their honest nature and sense of humor make them enjoyable companions, though they can sometimes be tactless in their straightforwardness.";
  } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    sign = "Capricorn";
    symbol = "♑";
    element = "Earth";
    description = "Capricorns are ambitious, disciplined, and patient. They have a practical approach to life and are willing to work hard for long-term success. Their responsible nature and wisdom beyond their years make them natural leaders, though they can sometimes be too focused on work at the expense of pleasure.";
  } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    sign = "Aquarius";
    symbol = "♒";
    element = "Air";
    description = "Aquarians are innovative, progressive, and humanitarian. They think outside the box and often have ideas ahead of their time. Their intellectual approach and interest in the collective good can inspire others, though they can sometimes appear detached or eccentric in their uniqueness.";
  } else {
    sign = "Pisces";
    symbol = "♓";
    element = "Water";
    description = "Pisceans are intuitive, compassionate, and imaginative. They have a deep connection to the spiritual and emotional realms. Their empathetic nature and creativity make them artistic and understanding friends, though they can sometimes lose themselves in dreams or emotions.";
  }
  
  return { sign, symbol, element, description };
}

// Get moon sign based on birth date
export function getMoonSign(date: Date) {
  // This is a simplified calculation - in a real app, you would use more precise astronomical calculations
  // For this demo, we'll use the SunCalc library to get moon position
  
  const moonPos = SunCalc.getMoonPosition(date, 0, 0);
  
  // Convert the moon's longitude to a zodiac sign (very simplified)
  // In astrology, this would be much more complex and would consider the exact position
  const longitude = (moonPos.azimuth * 180 / Math.PI) + 180;
  const position = (longitude % 360) / 30;
  
  const signs = [
    {
      sign: "Aries",
      element: "Fire",
      description: "Moon in Aries indicates emotional responses that are quick, direct, and sometimes impulsive. You may feel emotions intensely but move through them quickly. You're emotionally independent and may need action to process feelings."
    },
    {
      sign: "Taurus", 
      element: "Earth",
      description: "Moon in Taurus suggests emotional security is found through stability and physical comfort. You process feelings slowly and thoroughly, valuing consistency in your emotional life. Material security helps you feel emotionally grounded."
    },
    {
      sign: "Gemini", 
      element: "Air",
      description: "Moon in Gemini indicates a need for mental stimulation to feel emotionally satisfied. You process emotions through conversation and analysis. Variety and communication are essential for your emotional wellbeing."
    },
    {
      sign: "Cancer", 
      element: "Water",
      description: "Moon in Cancer creates deep emotional sensitivity and strong intuition. Your feelings run deep and you're highly attuned to others' emotions. Home, family, and nurturing connections are central to your emotional security."
    },
    {
      sign: "Leo", 
      element: "Fire",
      description: "Moon in Leo suggests you need recognition and creative expression for emotional fulfillment. Your feelings are dramatic, warm, and generous. Being appreciated and admired helps you feel emotionally secure."
    },
    {
      sign: "Virgo", 
      element: "Earth",
      description: "Moon in Virgo indicates you process emotions through analysis and practical problem-solving. You need order and usefulness to feel emotionally secure. You may be self-critical but have a genuine desire to improve and help others."
    },
    {
      sign: "Libra", 
      element: "Air",
      description: "Moon in Libra suggests emotional harmony comes through relationships and balance. You need beauty and peaceful surroundings to feel centered. Your emotional responses are measured and considerate of others."
    },
    {
      sign: "Scorpio", 
      element: "Water",
      description: "Moon in Scorpio creates intense, profound emotional experiences. You feel deeply and may be secretive about your true feelings. Emotional authenticity and transformation are essential for your wellbeing."
    },
    {
      sign: "Sagittarius", 
      element: "Fire",
      description: "Moon in Sagittarius indicates emotional fulfillment through freedom, exploration, and meaning. Your emotional responses are enthusiastic and optimistic. You need space to follow your beliefs and philosophical interests."
    },
    {
      sign: "Capricorn", 
      element: "Earth",
      description: "Moon in Capricorn suggests emotional security comes through achievement and structure. You may appear reserved but have deep feelings beneath the surface. Responsibility and self-discipline help you feel emotionally stable."
    },
    {
      sign: "Aquarius", 
      element: "Air",
      description: "Moon in Aquarius indicates emotional detachment and intellectual processing of feelings. You value emotional independence and may feel most secure when contributing to collective causes. Friendship and ideals are important to your emotional life."
    },
    {
      sign: "Pisces", 
      element: "Water",
      description: "Moon in Pisces creates heightened sensitivity and emotional receptivity. Your boundaries with others' emotions may be fluid, making you compassionate but potentially overwhelmed. Spiritual connection and creativity help you process feelings."
    }
  ];
  
  // Get the appropriate sign based on the calculated position
  const index = Math.floor(position);
  return signs[index >= 0 && index < 12 ? index : 0];
}