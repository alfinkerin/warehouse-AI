import { db } from "@/lib/db";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import * as z from "zod";

// schema input validation

const userSchema = z.object({
  from: z.string().min(1, "From is required").max(30),
  product: z.string().min(1, "From is required").max(30),
  stock: z.number().min(1, "stock is required"),
  to: z.string().min(1, "To is required"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { from, product, stock, to } = userSchema.parse(body);

    const newStore = await db.history.create({
      data: {
        from,
        product,
        stock,
        to,
      },
    });

    return NextResponse.json(
      {
        user: newStore,
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
    const allProduct = await db.history.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      {
        data: allProduct,
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
