
import { NextRequest, NextResponse } from 'next/server';

const WC_KEY = process.env.WC_CONSUMER_KEY;
const WC_SECRET = process.env.WC_CONSUMER_SECRET;

export async function POST(req: NextRequest) {
  const { form, cart } = await req.json();

  const orderData = {
    payment_method: 'cod',
    payment_method_title: 'Pouzećem',
    set_paid: false,
    billing: {
      first_name: form.firstName,
      last_name: form.lastName,
      address_1: form.address,
      city: form.city,
      postcode: form.postcode,
      country: 'RS',
      phone: form.phone,
      email: form.email || '',
    },
    shipping: {
      first_name: form.firstName,
      last_name: form.lastName,
      address_1: form.address,
      city: form.city,
      postcode: form.postcode,
      country: 'RS',
    },
    line_items: cart.map((item: any) => ({
      product_id: item.id,
      quantity: item.quantity,
    })),
    customer_note: form.note || '',
  };

  const res = await fetch(
    `https://api.doorgatesistem.com/wp-json/wc/v3/orders?consumer_key=${WC_KEY}&consumer_secret=${WC_SECRET}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    }
  );

  if (!res.ok) return NextResponse.json({ error: 'Failed' }, { status: 500 });
  return NextResponse.json({ success: true });
}