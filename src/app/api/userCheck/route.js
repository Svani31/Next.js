import { NextResponse } from "next/server";
import connectMongoDB from "../../../../libs/mongodb";
import Users from "../../../../models/users";

export async function POST(req) {
  try {
    const { username } = await req.json();
    await connectMongoDB();
    const getAllUser = await Users.findOne({ username }).select("_id");
    return NextResponse.json({ getAllUser });
  } catch (error) {
    console.log(error);
  }
}
