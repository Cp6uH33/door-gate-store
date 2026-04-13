import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const WC_KEY = process.env.WC_CONSUMER_KEY;
const WC_SECRET = process.env.WC_CONSUMER_SECRET;

async function handler(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const pathStr = path.join('/');
  const searchParams = req.nextUrl.searchParams;
  
  
  
  const url = new URL(`https://api.doorgatesistem.com/wp-json/wc/v3/${pathStr}`);
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
        'Host': 'api.doorgatesistem.com',
      },
      body: req.method === 'POST' ? await req.text() : undefined,
      redirect: 'follow',
    });
    const text = await res.text();
    console.log('Response status:', res.status);
    console.log('Response text:', text.substring(0, 200));
    
    try {
      const data = JSON.parse(text);
      return NextResponse.json(data);
    } catch {
      return NextResponse.json({ raw: text.substring(0, 500), status: res.status });
    }
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export const GET = handler;
export const POST = handler;
