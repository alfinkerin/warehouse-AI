import { db } from "@/lib/db";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import * as z from "zod";

// schema input validation

const userSchema = z.object({
  name: z.string().min(1, "Name is required").max(30),
  img: z.string().min(1, "phone is required"),
});
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, img } = userSchema.parse(body);

    const newGallery = await db.gallery.create({
      data: {
        name,
        img,
      },
    });

    return NextResponse.json(
      {
        user: newGallery,
        message: "Storet created succesfully",
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

export async function GET() {
  try {
    const allData = await db.gallery.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      {
        data: allData,
        message: "get store succesfully",
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
