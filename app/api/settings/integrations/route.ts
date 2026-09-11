import { NextResponse } from 'next/server';
import { INITIAL_SETTINGS } from '@/app/data/mockSettingsData';
import { ThreatIntelIntegration } from '@/app/types/settings';

let integrations: ThreatIntelIntegration[] = JSON.parse(JSON.stringify(INITIAL_SETTINGS.integrations));

// GET /api/settings/integrations
export async function GET() {
  try {
    return NextResponse.json(integrations);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to retrieve threat intelligence integrations.' },
      { status: 500 }
    );
  }
}

// PUT /api/settings/integrations
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    if (!body || !body.id) {
      return NextResponse.json(
        { error: 'Provider ID is required.' },
        { status: 400 }
      );
    }

    const index = integrations.findIndex((i) => i.id === body.id);
    if (index === -1) {
      return NextResponse.json(
        { error: `Provider "${body.id}" not found.` },
        { status: 404 }
      );
    }

    // Mask the provided key if an unmasked key was sent
    const rawKey = body.apiKey || '';
    const maskedKey = rawKey.length > 4
      ? '••••••••••••••••' + rawKey.slice(-4)
      : '••••••••••••••••••••••••••••••••';

    integrations[index] = {
      ...integrations[index],
      ...body,
      maskedKey: maskedKey,
      isConfigured: true,
      status: 'Connected',
      lastTested: 'Just now',
      latencyMs: Math.floor(60 + Math.random() * 90),
    };

    return NextResponse.json({
      message: `${integrations[index].name} configuration updated.`,
      integration: integrations[index],
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update threat intelligence integration.' },
      { status: 500 }
    );
  }
}
