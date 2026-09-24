"use client";

export type Member = {
  id: string;
  photoId: string;
  photo: string;
  name: string;
  bio: string;
  domain?: string;
  regNo?: string;
};

export const teMembers: Member[] = [
  {
    id: "TE-01",
    photoId: "TE-01",
    photo: "/members/te/TE-01.jpg",
    name: "Name to be added",
    bio: "",
  },
];
