import Sell from "../../../models/sellModels.cjs";
import { connectDB } from "../../../utils/connect";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const { type, brand, model, work, year, price, image, email } = await req.json();

    await Sell.create({ type, brand, model, work, year, price, email, image,registered:false });
    return NextResponse.json({ message: "Product registered." }, { status: 201 });

  } catch (error) {
    console.log("Error while registering advert. ", error);
    return NextResponse.json(
      { message: "Error occured while registering the advert." },
      { status: 500 }
    );

  }
}
