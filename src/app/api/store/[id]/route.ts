import { db } from "@/lib/db";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const getSingle = await db.store.findFirst({
      where: { id: params.id },
    });
    return NextResponse.json(
      {
        data: getSingle,
        message: "get single store succesfully",
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

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deleteProduct = await db.store.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      {
        data: deleteProduct,
        message: "delete store succesfully",
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

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { name, img, address, email, phone } = body;
    const updateProduct = await db.store.update({
      where: { id: params.id },
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
        data: updateProduct,
        message: "update product succesfully",
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
