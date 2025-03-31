import { getUser } from "@/auth/server";
import AskAIButton from "@/components/AskAIButton";
import NewNoteButton from "@/components/NewNoteButton";
import NoteTextInput from "@/components/NoteTextInput";
// import HomeToast from "@/components/HomeToast";
import { prisma } from "@/db/prisma";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function HomePage({ searchParams }: Props) {
  const noteIdParam = (await searchParams).noteId;
  const user = await getUser();

  const noteId = Array.isArray(noteIdParam)
    ? noteIdParam![0]
    : noteIdParam || "";

  const note = await prisma.note.findUnique({
    where: { id: noteId, authorId: user?.id },
  });

  return (
    <div className="flex w-full h-full flex-col items-center px-4 py-6 md:px-8 lg:px-12 ml-20 mt-4 justify-center">
      {/* Top button section */}
      <div className="flex w-full max-w-4xl justify-between items-center gap-4 md:flex-row flex-col">
        <NewNoteButton user={user} />
        <AskAIButton user={user} />
      </div>

      {/* Note Input Section */}
      <div className="w-full max-w-4xl flex flex-col mt-6">
        <NoteTextInput noteId={noteId} startingNoteText={note?.text || ""} />
      </div>
    </div>
  );
}

export default HomePage;
