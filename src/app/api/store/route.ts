import { db } from "@/lib/db";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import * as z from "zod";

// schema input validation

const userSchema = z.object({
  name: z.string().min(1, "Name is required").max(30),
  img: z.string().min(1, "phone is required"),
  address: z.string().min(1, "address is required"),
  email: z.string().min(1, "Email is required").email("invalid email"),
  phone: z.string().min(1, "phone is required"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, img, address, email, phone } = userSchema.parse(body);

    const newStore = await db.store.create({
      data: {
        name,
        img,
        address,
        email,
        phone,
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
    const allProduct = await db.store.findMany({
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

// export async function DELETE(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const deleteProduct = await db.product.delete({
//       where: {
//         id: params.id,
//       },
//     });

//     return NextResponse.json(
//       {
//         data: deleteProduct,
//         message: "delete product succesfully",
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       {
//         message: "Something went wrong",
//       },
//       { status: 500 }
//     );
//   }
// }
