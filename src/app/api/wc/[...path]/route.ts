import { NextRequest, NextResponse } from 'next/server';
import https from 'https';

const WC_KEY = process.env.NEXT_PUBLIC_WC_CONSUMER_KEY;
const WC_SECRET = process.env.NEXT_PUBLIC_WC_CONSUMER_SECRET;

const agent = new https.Agent({ rejectUnauthorized: false });

async function handler(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const pathStr = path.join('/');
  const searchParams = req.nextUrl.searchParams;
  
  const url = new URL(`https://195.35.49.191/wp-json/wc/v3/${pathStr}`);
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
      headers: { 
        'Content-Type': 'application/json',
        'Host': 'doorgatesistem.com',
      },
      // @ts-ignore
      agent,
      body: req.method === 'POST' ? await req.text() : undefined,
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export const GET = handler;
export const POST = handler;
