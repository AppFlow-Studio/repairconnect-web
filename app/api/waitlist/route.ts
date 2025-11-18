import { NextRequest, NextResponse } from 'next/server';
import { sendWaitlistConfirmationEmail, sendWaitlistNotificationEmail } from '@/email/send';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, name } = body;

        // Validate email
        if (!email || typeof email !== 'string' || !email.includes('@')) {
            return NextResponse.json(
                { error: 'Valid email is required' },
                { status: 400 }
            );
        }

        // Send confirmation email to user
        const confirmationResult = await sendWaitlistConfirmationEmail({
            email,
            name: name || undefined,
        });

        if (!confirmationResult.success) {
            console.error('Failed to send confirmation email:', confirmationResult.error);
            // Continue anyway - we'll still send the notification
        }

        // Send notification email to company
        const notificationResult = await sendWaitlistNotificationEmail({
            email,
            name: name || undefined,
        });

        if (!notificationResult.success) {
            console.error('Failed to send notification email:', notificationResult.error);
            // Continue anyway - user confirmation was sent
        }

        return NextResponse.json(
            {
                success: true,
                message: 'Successfully joined waitlist!',
                confirmationSent: confirmationResult.success,
                notificationSent: notificationResult.success,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error processing waitlist signup:', error);
        return NextResponse.json(
            { error: 'Failed to process waitlist signup. Please try again.' },
            { status: 500 }
        );
    }
}

