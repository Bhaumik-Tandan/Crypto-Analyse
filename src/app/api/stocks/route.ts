import {  NextApiResponse,NextApiRequest } from 'next';
import { NextResponse,NextRequest } from 'next/server';
import getStockData from "../../utility/getStockData";
export const dynamic="force-dynamic";
export const GET =async (req: NextRequest, res: NextApiResponse) => {
  try {
    const symbol = req.nextUrl.searchParams.get('symbol');
    const data = await getStockData(symbol||"XBTUSD");
    return NextResponse.json( data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' });
  }
}