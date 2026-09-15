import { NextResponse } from 'next/server';

// In-memory mock store for OTP verification during development / mock mode
// Key: email (lowercased), Value: { otp, username, role, expiresAt }
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
    const { username, email, password, role, resendOnly } = body;

    if (resendOnly) {
      if (!email || typeof email !== 'string') {
        return NextResponse.json(
          { success: false, error: 'Email address is required to resend OTP.' },
          { status: 400 }
        );
      }

      const normalizedEmail = email.trim().toLowerCase();
      const generatedOtp = '123456';
      const existing = otpStore.get(normalizedEmail);

      otpStore.set(normalizedEmail, {
        otp: generatedOtp,
        username: existing?.username || normalizedEmail.split('@')[0],
        role: existing?.role || 'User',
        expiresAt: Date.now() + 10 * 60 * 1000,
      });

      return NextResponse.json({
        success: true,
        message: 'Verification code resent successfully.',
        email: normalizedEmail,
      });
    }

    // Validation
    if (!username || typeof username !== 'string' || username.trim().length < 3) {
      return NextResponse.json(
        { success: false, error: 'Username is required and must be at least 3 characters.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    if (!password || typeof password !== 'string' || password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 8 characters in length.' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    const cleanUsername = username.trim();

    // Role assignment (User, Analyst, or Admin)
    const validRoles = ['User', 'Analyst', 'Admin'];
    const assignedRole = validRoles.includes(role) ? role : 'User';

    // Store mock OTP
    const generatedOtp = '123456';
    otpStore.set(normalizedEmail, {
      otp: generatedOtp,
      username: cleanUsername,
      role: assignedRole,
      expiresAt: Date.now() + 10 * 60 * 1000,
    });

    // In a production deployment with configured SMTP (e.g. Resend, SendGrid, AWS SES),
    // email dispatch would be triggered here:
    // await sendVerificationEmail(normalizedEmail, generatedOtp);

    return NextResponse.json({
      success: true,
      message: 'Verification code sent to your email address.',
      email: normalizedEmail,
      role: assignedRole,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Internal server error processing registration.' },
      { status: 500 }
    );
  }
}
