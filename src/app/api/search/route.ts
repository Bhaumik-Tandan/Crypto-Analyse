import {  NextApiResponse } from 'next';
import { NextResponse,NextRequest } from 'next/server';
import searchSymbol from '@/app/utility/searchSymbol';
export const dynamic="force-dynamic";
export const GET =async (req: NextRequest, res: NextApiResponse) => {
  try {
    const symbol = req.nextUrl.searchParams.get('q');
    const data = await searchSymbol(symbol||"");
    return NextResponse.json( data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' });
  }
}