import axios from "axios";

const langchainUrl = process.env.LANGCHAIN_URL || "http://127.0.0.1:8000/query";

export const getResponseFromLangchain = async (message: string, sessionId: string) => {

  const res = await axios.post(langchainUrl, {
    query: message,
    top_k: 1
  });
  return res.data;
};