import { db } from "@/lib/db";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import * as z from "zod";

// schema input validation

const userSchema = z.object({
  name: z.string().min(1, "Title is required").max(30),
  stock: z.number().min(1, "Stock is required"),
  price: z.number().min(1, "Price is required"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, stock, price } = userSchema.parse(body);

    const newProduct = await db.product.create({
      data: {
        name,
        stock,
        price,
      },
    });

    return NextResponse.json(
      {
        user: newProduct,
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

export async function GET() {
  try {
    const allProduct = await db.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      {
        data: allProduct,
        message: "get product succesfully",
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

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url).searchParams;
    const id = String(url.get("id")) || "";

    const deleteProduct = await db.product.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(
      {
        data: deleteProduct,
        message: "delete product succesfully",
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
