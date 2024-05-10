"use server";
import {  NextApiResponse,NextApiRequest } from 'next';
import { NextResponse,NextRequest } from 'next/server';
import getStockData from "../../utility/getStockData";
export const GET =async (req: NextRequest, res: NextApiResponse) => {
  try {
    const url = new URL(req.url);
    const symbol = url.searchParams.get('symbol');
    const data = await getStockData(symbol||"XBTUSD");
    return NextResponse.json( data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' });
  }
}