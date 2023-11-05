import OpenAI from "openai";

import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { content } = body;

    const aiResponse = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `berikan sebuah ringkasan dengan data penjualan terbanyak di toko kamila dengan product parfum bermerek ${content} dengan penjualan 240 kali pada bulan ini , lebih banyak 20% dari bulan kemarin  , dan berikan solusi untuk memperbanyak penjualan dan mengatur sebuah toko`,
        },
      ],
      model: "gpt-3.5-turbo",
    });
    console.log(aiResponse.choices);
    return NextResponse.json(
      {
        user: aiResponse.choices,
        message: "Product created succesfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
