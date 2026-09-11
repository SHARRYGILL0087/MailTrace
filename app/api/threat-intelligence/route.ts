import { NextResponse } from 'next/server';
import { generateDynamicMockIntel, inferIndicatorType } from '@/app/data/mockThreatIntelData';
import { IndicatorType } from '@/app/types/threatIntel';

// GET /api/threat-intelligence?indicator=8.8.8.8&type=ip
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const indicator = searchParams.get('indicator');
    const rawType = searchParams.get('type') as IndicatorType | null;

    if (!indicator || !indicator.trim()) {
      return NextResponse.json(
        { error: 'Missing required query parameter "indicator".' },
        { status: 400 }
      );
    }

    const type = rawType || inferIndicatorType(indicator);
    const data = generateDynamicMockIntel(indicator, type);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error processing threat intelligence request.' },
      { status: 500 }
    );
  }
}

// POST /api/threat-intelligence
// Body: { "indicator": "8.8.8.8", "type": "ip" }
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || !body.indicator || typeof body.indicator !== 'string' || !body.indicator.trim()) {
      return NextResponse.json(
        { error: 'Missing required field "indicator" in request body.' },
        { status: 400 }
      );
    }

    const indicator = body.indicator.trim();
    const type: IndicatorType = body.type || inferIndicatorType(indicator);

    // Simulate standard lookup latency
    const data = generateDynamicMockIntel(indicator, type);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error processing threat intelligence request.' },
      { status: 500 }
    );
  }
}
