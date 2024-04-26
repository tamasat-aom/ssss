import { connectMongoDB } from "../../../lib/mongobd";
import Quater from "../../../models/quater";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();
  const quater = await Quater.find({});
  return NextResponse.json({ quater });
}

export async function DELETE(req: any) {
  const id = req.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Quater.findByIdAndDelete(id);
  return NextResponse.json({ message: "Quater deleted" }, { status: 200 });
}

export async function POST(req: any) {
  const { quater, content } = await req.json();
  await connectMongoDB();
  await Quater.create({ quater, content });
  return NextResponse.json({ message: "Quater created" }, { status: 201 });
}

export async function PUT(req: any) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    const { quater, content } = await req.json();
    await connectMongoDB();
    await Quater.findByIdAndUpdate(id, { quater, content });
    return NextResponse.json({ message: "Quater updated" }, { status: 200 });
  } catch (error) {
    console.log("Error updating quater: ", error);
    return NextResponse.json(
      { error: "Failed to update quater" },
      { status: 500 }
    );
  }
}
