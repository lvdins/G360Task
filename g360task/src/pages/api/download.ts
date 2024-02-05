import path from "path";

import { NextApiRequest, NextApiResponse } from "next";

import getContentType from "@/utils/getContentType";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "GET") {
      res.status(405).json({ error: true, msg: "Only GET method is allowed." });
      return;
    }

    const reqImageUrl = req.query.url as string;

    if (!reqImageUrl) {
      res
        .status(400)
        .json({
          error: true,
          msg: "Image URL was not provided as a query parameter",
        });
      return;
    }

    const imageFetchResponse = await fetch(reqImageUrl);

    if (!imageFetchResponse.ok) {
      res.status(400).json({ error: true, msg: "Image URL is invalid" });
      return;
    }

    const imageBuffer = Buffer.from(await imageFetchResponse.arrayBuffer());
    const imageType = path.extname(new URL(reqImageUrl).pathname).slice(1);

    res.setHeader("Content-Type", getContentType(imageType));
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=image.${imageType}`
    );
    res.send(imageBuffer);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    res.status(500).json({ error: "Internal server error. Try again later." });
  }
}
