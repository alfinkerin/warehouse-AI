import { db } from "@/lib/db";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const getSingle = await db.employee.findFirst({
      where: { id: params.id },
    });
    return NextResponse.json(
      {
        data: getSingle,
        message: "get single employee succesfully",
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
    const deleteEmployee = await db.employee.delete({
      where: { id: params.id },
    });

    return NextResponse.json(
      {
        data: deleteEmployee,
        message: "delete employee succesfully",
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
    const { name, income, position, email } = body;
    const updateEmployee = await db.employee.update({
      where: { id: params.id },
      data: {
        name,
        income,
        position,
        email,
      },
    });

    return NextResponse.json(
      {
        data: updateEmployee,
        message: "update employee succesfully",
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
