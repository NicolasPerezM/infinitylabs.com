/**
 * Team roster from the legacy site (docs/SITE_AUDIT.md §7).
 * Titles are marketing-era and unconfirmed for the new company (GAP-007).
 * The About page renders people only when `verified` is true. None is today.
 */

export type TeamMember = {
  name: string;
  legacyTitle: string;
  title?: string;
  linkedin?: string;
  photo?: string;
  verified: boolean;
};

export const team: TeamMember[] = [
  { name: "Andrés Márquez", legacyTitle: "Director of AI and Technological Development", linkedin: "https://www.linkedin.com/in/andres-marquez1/", verified: false },
  { name: "Harrison Hoyos", legacyTitle: "Head of Innovation and Technological Development", linkedin: "https://www.linkedin.com/in/harrison194/", verified: false },
  { name: "Felipe Madero", legacyTitle: "Business Executive", linkedin: "https://www.linkedin.com/in/felipemadero/", verified: false },
  { name: "Andrés Hurtado", legacyTitle: "Director Trafficker and Strategy", linkedin: "https://www.linkedin.com/in/andr%C3%A9s-hurtado-fierro-68b783211/", verified: false },
  { name: "Camilo Sanabria", legacyTitle: "Leader in Digital Strategies", linkedin: "https://www.linkedin.com/in/camilo-sanabria-ba9370192/", verified: false },
];

export const verifiedTeam = team.filter((m) => m.verified);
