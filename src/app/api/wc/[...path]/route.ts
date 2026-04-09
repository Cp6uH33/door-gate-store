import { NextRequest, NextResponse } from 'next/server';

const WC_KEY = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY;
const WC_SECRET = process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET;

async function handler(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const pathStr = path.join('/');
  const searchParams = req.nextUrl.searchParams;
  
  const url = new URL(`https://doorgatesistem.com/wp-json/wc/v3/${pathStr}`);
  searchParams.forEach((value, key) => {
    if (key !== 'consumer_key' && key !== 'consumer_secret') {
      url.searchParams.set(key, value);
    }
  });
  url.searchParams.set('consumer_key', WC_KEY!);
  url.searchParams.set('consumer_secret', WC_SECRET!);

  try {
    const res = await fetch(url.toString(), {
      method: req.method,
      headers: { 'Content-Type': 'application/json' },
      body: req.method === 'POST' ? await req.text() : undefined,
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export const GET = handler;
export const POST = handler;
