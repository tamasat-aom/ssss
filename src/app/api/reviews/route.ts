import { connectMongoDB } from "../../../lib/mongobd";
import Reviews from "../../../models/reviews";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const { name, Good, Bad } = await req.json();
  await connectMongoDB();
  await Reviews.create({ name, Good, Bad });
  return NextResponse.json({ message: "Review created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const review = await Reviews.find({});
  return NextResponse.json({ review });
}

export async function DELETE(req: any) {
  const id = req.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Reviews.findByIdAndDelete(id);
  return NextResponse.json({ message: "Reviews deleted" }, { status: 200 });
}

export async function PUT(req: any) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    const { name, Good, Bad } = await req.json();
    await connectMongoDB();
    await Reviews.findByIdAndUpdate(id, { name, Good, Bad });
    return NextResponse.json({ message: "Reviews updated" }, { status: 200 });
  } catch (error) {
    console.log("Error updating Reviews: ", error);
    return NextResponse.json(
      { error: "Failed to update Reviews" },
      { status: 500 }
    );
  }
}
