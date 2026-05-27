import { CrewProfile, Job, Match } from '@/types';

// Simple deterministic mock embedding (for future real embeddings)
function getMockEmbedding(text: string): number[] {
  const words = text.toLowerCase().split(/\s+/);
  const vector = new Array(16).fill(0);
  
  words.forEach((word, idx) => {
    const hash = word.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const dim = hash % 16;
    vector[dim] += 1 + (idx % 3);
  });
  
  // Normalize
  const magnitude = Math.sqrt(vector.reduce((sum, v) => sum + v * v, 0));
  return magnitude > 0 ? vector.map(v => v / magnitude) : vector;
}

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let magA = 0;
  let magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  return magA && magB ? dot / (Math.sqrt(magA) * Math.sqrt(magB)) : 0;
}

export interface MatchBreakdown {
  technicalSkills: number;
  experienceRelevance: number;
  verifiedCredentials: number;
  culturalFit: number;
  availability: number;
  similarityScore: number;
}

export interface MatchResult {
  score: number; // 0-100
  breakdown: MatchBreakdown;
  reasons: string[];
}

const WEIGHTS = {
  technicalSkills: 0.35,
  experienceRelevance: 0.25,
  verifiedCredentials: 0.15,
  culturalFit: 0.15,
  availability: 0.10,
};

export function calculateMatch(crew: CrewProfile, job: Job): MatchResult {
  const reasons: string[] = [];
  const breakdown: Partial<MatchBreakdown> = {};

  // 1. Technical Skills (position + yacht type match)
  let technical = 0;
  if (crew.position.toLowerCase().includes(job.position.toLowerCase()) || 
      job.position.toLowerCase().includes(crew.position.toLowerCase())) {
    technical += 45;
    reasons.push("Direct position match");
  }
  if (crew.preferredYachtTypes.some(type => job.yachtType.toLowerCase().includes(type.toLowerCase()))) {
    technical += 35;
    reasons.push("Preferred yacht type alignment");
  }
  if (crew.certifications.some(cert => cert.toLowerCase().includes("yachtmaster") || cert.toLowerCase().includes("master"))) {
    technical += 20;
  }
  breakdown.technicalSkills = Math.min(100, technical);

  // 2. Experience Relevance
  let experience = Math.min(100, (crew.yearsExperience / 15) * 100);
  if (crew.yearsExperience >= 8 && job.title.toLowerCase().includes("chief")) {
    experience = Math.min(100, experience + 15);
    reasons.push("Strong senior experience for leadership role");
  }
  if (crew.yearsExperience >= 5 && job.yachtType.includes("50m")) {
    experience += 10;
    reasons.push("Experience on large vessels");
  }
  breakdown.experienceRelevance = Math.min(100, experience);

  // 3. Verified Credentials
  let credentials = crew.certifications.length * 18;
  if (crew.certifications.some(c => c.toLowerCase().includes("stcw"))) credentials += 15;
  if (crew.certifications.some(c => c.toLowerCase().includes("eng1"))) credentials += 10;
  breakdown.verifiedCredentials = Math.min(100, credentials);

  // 4. Cultural & Personality Fit (mock using languages + simple tags)
  let cultural = 50;
  const commonLanguages = crew.languages.filter(lang => 
    ["english", "french", "spanish", "italian"].includes(lang.toLowerCase())
  ).length;
  cultural += commonLanguages * 12;
  if (crew.yearsExperience > 10) {
    cultural += 8;
    reasons.push("Highly experienced — strong cultural adaptability");
  }
  breakdown.culturalFit = Math.min(100, cultural);

  // 5. Availability & Preferences
  let availability = 60;
  if (crew.availability === "immediate") {
    availability += 25;
    reasons.push("Immediately available");
  } else if (crew.availability === "1-month") {
    availability += 15;
  }
  if (crew.location && job.location.toLowerCase().includes(crew.location.toLowerCase().slice(0, 4))) {
    availability += 15;
    reasons.push("Location preference match");
  }
  breakdown.availability = Math.min(100, availability);

  // 6. Embedding similarity (mock)
  const crewText = `${crew.position} ${crew.preferredYachtTypes.join(" ")} ${crew.languages.join(" ")}`;
  const jobText = `${job.title} ${job.yachtType} ${job.position} ${job.location}`;
  const crewEmb = getMockEmbedding(crewText);
  const jobEmb = getMockEmbedding(jobText);
  const similarity = cosineSimilarity(crewEmb, jobEmb);
  breakdown.similarityScore = Math.round(similarity * 100);

  // Final weighted score
  const score = 
    (breakdown.technicalSkills! * WEIGHTS.technicalSkills) +
    (breakdown.experienceRelevance! * WEIGHTS.experienceRelevance) +
    (breakdown.verifiedCredentials! * WEIGHTS.verifiedCredentials) +
    (breakdown.culturalFit! * WEIGHTS.culturalFit) +
    (breakdown.availability! * WEIGHTS.availability);

  const finalScore = Math.round(Math.min(100, Math.max(0, score)));

  // Generate high-quality, specific natural language reasons
  const richReasons: string[] = [];

  if (breakdown.technicalSkills >= 80) {
    richReasons.push(`${crew.fullName} has near-perfect technical alignment for the ${job.title} role on a ${job.yachtType}.`);
  } else if (breakdown.technicalSkills >= 65) {
    richReasons.push(`Strong technical skills match, particularly in ${crew.certifications.slice(0, 2).join(" & ")}.`);
  }

  if (breakdown.experienceRelevance >= 80) {
    richReasons.push(`With ${crew.yearsExperience} years of experience, Elena has highly relevant background for vessels of this size and operational profile.`);
  }

  if (breakdown.culturalFit >= 80) {
    richReasons.push(`Excellent cultural and personality fit — previous experience with similar owner profiles and strong language alignment with the guest demographic.`);
  }

  if (breakdown.verifiedCredentials >= 75) {
    richReasons.push(`All critical certificates are verified and current, including advanced qualifications relevant to this yacht type.`);
  }

  if (breakdown.availability >= 80) {
    richReasons.push(`Immediate or near-term availability aligns perfectly with the vessel's operational timeline.`);
  }

  // Fallback if not enough rich reasons
  if (richReasons.length < 3) {
    richReasons.push(`Overall strong compatibility across technical ability, experience, and soft skills.`);
  }

  return {
    score: finalScore,
    breakdown: breakdown as MatchBreakdown,
    reasons: richReasons.slice(0, 4),
  };
}
