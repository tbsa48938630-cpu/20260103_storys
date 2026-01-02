
import { GoogleGenAI, Chat } from "@google/genai";

const SYSTEM_INSTRUCTION = `你是一位幽默風趣的兒童故事作家，擅長用誇張、好笑的方式運用成語。
你的任務是協助使用者編寫一段充滿想像力、無厘頭的連續故事。

規則：
1. 每次產生的內容約 100 字。
2. 必須將故事中出現的成語/關鍵詞用 Markdown 的粗體語法 **加粗** 顯示。
3. 除非是使用者要求「故事結束」，否則故事必須在最精彩、最緊張的地方「突然中斷」，並加上「欲知後事如何，請接下一句...」。
4. 語氣要親切、像在對小朋友說故事，帶點浮誇的表演感。
5. 當使用者按下「故事結束」的要求時，請為故事寫一個超展開但完整的結局，並在開頭加上「【大結局】」。`;

let activeChat: Chat | null = null;

export const startStory = async (keywords: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  activeChat = ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 1.0,
    },
  });

  const response = await activeChat.sendMessage({ message: `這是我提供的起始成語/詞彙：${keywords}。請開始故事！` });
  return response.text;
};

export const continueStory = async (nextSentence: string) => {
  if (!activeChat) throw new Error("尚未開始故事");
  const response = await activeChat.sendMessage({ message: `接下來的情節發展是：${nextSentence}。請繼續編寫下一段。` });
  return response.text;
};

export const endStory = async () => {
  if (!activeChat) throw new Error("尚未開始故事");
  const response = await activeChat.sendMessage({ message: `請為這個故事寫下最後的【大結局】！` });
  activeChat = null; // Reset chat after ending
  return response.text;
};
