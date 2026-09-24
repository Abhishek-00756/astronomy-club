export type MemberCategory =
  | "secretaries"
  | "te"
  | "joint-secretaries"
  | "fe";

export type MemberProfile = {
  id: string;
  photoId: string;
  photo?: string;
  name: string;
  bio: string;
  domain?: string;
  regNo?: string;
};

export { secretaries } from "./members/secretaries/members";
export { teMembers } from "./members/te/members";
export { jointSecretaries } from "./members/joint-secretaries/members";
export { feMembers } from "./members/fe/members";
