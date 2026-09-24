export type MemberProfile = {
  id: string;
  name: string;
  role: string;
  category: "Secretaries" | "TE Members" | "Joint Secretaries" | "FE Members";
  initials: string;
  image?: string;
  branch?: string;
  year?: string;
  bio?: string;
  instagram?: string;
  linkedin?: string;
};

export const members: MemberProfile[] = [
  // Add real members here.
];
