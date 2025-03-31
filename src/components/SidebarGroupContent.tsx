"use client";

import { Note } from "@prisma/client";

type props = {
  notes: Note[];
};
const SidebarGroupContent = ({ notes }: props) => {
  console.log(notes);
  return <div className="mt-10">Your Notes Here</div>;
};

export default SidebarGroupContent;
