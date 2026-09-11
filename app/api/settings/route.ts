import { NextResponse } from 'next/server';
import { INITIAL_SETTINGS } from '@/app/data/mockSettingsData';
import { FullSettings } from '@/app/types/settings';

// In-memory state for dev runtime
let currentSettings: FullSettings = JSON.parse(JSON.stringify(INITIAL_SETTINGS));

// GET /api/settings
export async function GET() {
  try {
    return NextResponse.json(currentSettings);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to retrieve application settings.' },
      { status: 500 }
    );
  }
}

// PUT /api/settings
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Invalid settings payload.' },
        { status: 400 }
      );
    }

    // Merge updates into current settings
    currentSettings = {
      ...currentSettings,
      ...body,
      general: { ...currentSettings.general, ...(body.general || {}) },
      ai: { ...currentSettings.ai, ...(body.ai || {}) },
      notifications: { ...currentSettings.notifications, ...(body.notifications || {}) },
      security: { ...currentSettings.security, ...(body.security || {}) },
      dataEvidence: { ...currentSettings.dataEvidence, ...(body.dataEvidence || {}) },
    };

    return NextResponse.json({
      message: 'Settings updated successfully.',
      settings: currentSettings,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save application settings.' },
      { status: 500 }
    );
  }
}
