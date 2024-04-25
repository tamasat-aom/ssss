import { connectMongoDB } from "../../lib/mongobd";
import Quater from "../../../src/models/quater";
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
