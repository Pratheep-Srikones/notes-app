"use client";

import { Note } from "@prisma/client";
import {
  SidebarGroupContent as SidebarGroupContentShadCN,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import React, { useEffect, useMemo } from "react";
import Fuse from "fuse.js";
import SelectNoteButton from "./SelectNoteButton";
import DeleteNoteButton from "./DeleteNoteButton";

type props = {
  notes: Note[];
};
const SidebarGroupContent = ({ notes }: props) => {
  const [searchText, setSearchText] = React.useState<string>("");
  const [localNotes, setLocalNotes] = React.useState<Note[]>(notes);

  const fuse = useMemo(() => {
    return new Fuse(localNotes, {
      keys: ["text"],
      threshold: 0.4,
    });
  }, [localNotes]);
  const filteredNotes = searchText
    ? fuse.search(searchText).map((res) => res.item)
    : localNotes;

  useEffect(() => {
    setLocalNotes(notes);
  }, [notes]);

  const deleteNoteLocally = (noteId: string) => {
    setLocalNotes((prevNotes) =>
      prevNotes.filter((note) => note.id !== noteId)
    );
  };
  return (
    <SidebarGroupContentShadCN>
      <div className="relative flex items-center">
        <SearchIcon className="absolute left-2 size-2" />
        <Input
          className="bg-muted pl-8"
          placeholder="Search for notes..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <SidebarMenu className="mt-4">
        {filteredNotes.map((note) => {
          return (
            <SidebarMenuItem key={note.id} className="group/item">
              <SelectNoteButton note={note} />

              <DeleteNoteButton
                noteId={note.id}
                deleteNoteLocally={deleteNoteLocally}
              />
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroupContentShadCN>
  );
};

export default SidebarGroupContent;
