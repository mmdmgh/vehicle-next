import { NextResponse } from "next/server";
import Sell from "../../../models/sellModels.cjs";
import { connectDB } from "../../../utils/connect";

export async function GET() {
    try {
      await connectDB();
  
      const products = await Sell.find();
      return NextResponse.json(products, { status: 200 });
  
    } catch (error) {
      console.log("Error while fetching products.", error);
      return NextResponse.json(
        { message: "Error occurred while fetching products." },
        { status: 500 }
      );
    }
  }

