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

export const secretaries: Member[] = [
  {
    id: "SEC-01",
    photoId: "SEC-01",
    photo: "/members/secretaries/SEC-01.jpg",
    name: "Name to be added",
    bio: "",
  },
  {
    id: "SEC-02",
    photoId: "SEC-02",
    photo: "/members/secretaries/SEC-02.jpg",
    name: "Name to be added",
    bio: "",
  },
  {
    id: "SEC-03",
    photoId: "SEC-03",
    photo: "/members/secretaries/SEC-03.jpg",
    name: "Name to be added",
    bio: "",
  },
];
