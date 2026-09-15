import { NextResponse } from 'next/server';

declare global {
  // eslint-disable-next-line no-var
  var __MAILTRACE_OTP_STORE__: Map<string, { otp: string; username: string; role: string; expiresAt: number }> | undefined;
}

if (!global.__MAILTRACE_OTP_STORE__) {
  global.__MAILTRACE_OTP_STORE__ = new Map();
}

const otpStore = global.__MAILTRACE_OTP_STORE__;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, otp } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Email address is required.' },
        { status: 400 }
      );
    }

    if (!otp || typeof otp !== 'string' || !/^\d{6}$/.test(otp.trim())) {
      return NextResponse.json(
        { success: false, error: 'Verification code must be exactly 6 digits.' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const enteredOtp = otp.trim();

    const record = otpStore.get(normalizedEmail);

    // Mock validation: accept either stored OTP or universal test OTP '123456'
    const isOtpValid = (record && record.otp === enteredOtp) || enteredOtp === '123456';

    if (!isOtpValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid verification code. Please check your code and try again.' },
        { status: 400 }
      );
    }

    if (record && Date.now() > record.expiresAt) {
      otpStore.delete(normalizedEmail);
      return NextResponse.json(
        { success: false, error: 'Verification code has expired. Please request a new code.' },
        { status: 400 }
      );
    }

    // Role retrieved from registration
    const username = record?.username || normalizedEmail.split('@')[0];
    const validRoles = ['User', 'Analyst', 'Admin'];
    const role = (record?.role && validRoles.includes(record.role)) ? record.role : 'User';

    const roleDescMap: Record<string, string> = {
      User: 'Basic Analysis',
      Analyst: 'Full Investigation',
      Admin: 'Platform Management',
    };

    // Clear OTP after successful consumption
    otpStore.delete(normalizedEmail);

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      user: {
        username,
        email: normalizedEmail,
        role,
        roleDescription: roleDescMap[role] || 'Basic Analysis',
        createdAt: new Date().toISOString(),
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Internal server error verifying OTP.' },
      { status: 500 }
    );
  }
}
