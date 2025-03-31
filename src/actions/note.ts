"use server";

import { getUser } from "@/auth/server";
import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/handler";

export const updateNoteAction = async (noteId: string, text: string) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("Login to update note");

    await prisma.note.update({
      where: {
        id: noteId,
        authorId: user.id,
      },
      data: {
        text,
      },
    });
  } catch (error) {
    return handleError(error);
  }
};
export const createNoteAction = async (noteId: string) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("Login to create note");

    await prisma.note.create({
      data: {
        id: noteId,
        authorId: user.id,
        text: "",
      },
    });
  } catch (error) {
    return handleError(error);
  }
};
