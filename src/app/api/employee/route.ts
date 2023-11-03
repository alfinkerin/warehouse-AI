import { db } from "@/lib/db";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import * as z from "zod";

// schema input validation

const userSchema = z.object({
  name: z.string().min(1, "Name is required").max(30),
  income: z.number().min(1, "Income is required"),
  position: z.string().min(1, "Position is required"),
  email: z.string().min(1, "Email is required").email("invalid email"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, income, position, email } = userSchema.parse(body);

    const newEmployee = await db.employee.create({
      data: {
        name,
        income,
        position,
        email,
      },
    });

    return NextResponse.json(
      {
        user: newEmployee,
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
    const allProduct = await db.employee.findMany({
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
