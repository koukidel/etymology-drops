import { NextResponse } from 'next/server';
import { wordBank } from '@/data/wordBank';

export async function GET() {
    // In a real app, this would fetch from a DB
    return NextResponse.json(wordBank);
}
