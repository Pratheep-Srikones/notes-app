"use server";

import { getUser } from "@/auth/server";
import { prisma } from "@/db/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { handleError } from "@/lib/handler";

export const updateNoteAction = async (noteId: string, text: string) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("Login to update note");

    await prisma.note.update({
      where: {
        id: noteId,
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
export const deleteNoteAction = async (noteId: string) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("You must be logged in to delete a note");

    await prisma.note.delete({
      where: { id: noteId, authorId: user.id },
    });

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export const askAIAboutNotesAction = async (
  newQuestions: string[],
  responses: string[],
  noteId: string
) => {
  try {
    const user = await getUser();
    if (!user) throw new Error("Login to ask AI about notes");

    const note = await prisma.note.findUnique({
      where: { id: noteId },
      select: { text: true, createdAt: true, updatedAt: true },
    });
    if (!note) {
      return "Note not found";
    }

    const formattedNote = `Note: ${
      note.text
    }\nCreated at: ${note.createdAt.toString()}\nlast Updated at: ${note.updatedAt.toString()}`;

    const ROLE_PROMPT =
      "Your goal is to provide accurate and concise answers based on the given information and instructions.";
    const RULES_PROMPT = `
          You are a helpful assistant that answers questions about a user's notes.
          Assume all questions are related to the user's notes.
          IF NOTE DOES NOT HAVE ENOUGH CONTENT BUT THE QUESTION IS RELATED TO THE NOTE GENERATE REPONSE USING YOUR KNOWLEDGE.
          Make sure that your answers are not too verbose and you speak succinctly.
          Your responses MUST be formatted in clean, valid HTML with proper structure.
          Use tags like <p>, <strong>, <em>, <ul>, <ol>, <li>, <h1> to <h6>, and <br> when appropriate.
          Do NOT wrap the entire response in a single <p> tag unless it's a single paragraph.
          Avoid inline styles, JavaScript, or custom attributes.

          Rendered like this in JSX:
          <p dangerouslySetInnerHTML={{ __html: YOUR_RESPONSE }} />

          Here are the user's notes:      ${formattedNote}
          Here are the user's questions and answers so far:
          <ul>
            ${newQuestions
              .map(
                (question, index) =>
                  `<li><strong>Q:</strong> ${question}<br><strong>A:</strong> ${
                    responses[index] || "No answer yet"
                  }</li>`
              )
              .join("")}
          </ul>
`;
    const prompt = `${ROLE_PROMPT}${RULES_PROMPT}`;
    console.log("AI Prompt:", prompt);
    const apiKey = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey! || "");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    console.log("AI Response:", responseText);

    if (responseText) {
      return responseText;
    } else {
      return ["No response received from the chatbot."];
    }
  } catch (error) {
    return handleError(error);
  }
};
