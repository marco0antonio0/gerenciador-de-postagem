// api/exemplo.ts
import { getPost, getPostByKey } from "@/services/post";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,OPTIONS,PATCH,DELETE,POST,PUT"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );
    const { t } = req.query;
    try {
      console.log(t);
      getPostByKey(t as string)
        .then((e) => {
          res.status(200).json({ data: e });
        })
        .catch((e) => {
          res.status(404).json({ data: [] });
        });
    } catch (error) {
      console.error("Error:", error); // caso falhe irá imprimir o erro
      res.status(400).json({ data: "erro" + error });
    }
  }
}
