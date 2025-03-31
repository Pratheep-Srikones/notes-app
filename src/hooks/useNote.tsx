"use client";

import { NoteProviderContext } from "@/providers/NoteProvider";
import { useContext } from "react";

function useNote() {
  const context = useContext(NoteProviderContext);

  if (!context) {
    throw new Error("Must be used with a context");
  }

  return context;
}

export default useNote;
