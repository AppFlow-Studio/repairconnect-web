# Email Setup Guide

This directory contains the email functionality for the Otopair waitlist using Resend.

## Setup Instructions

### 1. Get Your Resend API Key

1. Sign up for a free account at [Resend](https://resend.com)
2. Navigate to [API Keys](https://resend.com/api-keys)
3. Create a new API key
4. Copy the API key

### 2. Configure Environment Variables

Create a `.env.local` file in the root of your project (if it doesn't exist) and add:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
COMPANY_EMAIL=team@otopair.com
```

Replace:
- `re_xxxxxxxxxxxxxxxxxxxxx` with your actual Resend API key
- `team@otopair.com` with the email address where you want to receive waitlist notifications

### 3. Verify Your Domain (Optional but Recommended)

For production use, you should verify your domain with Resend:

1. Go to [Domains](https://resend.com/domains) in your Resend dashboard
2. Add and verify your domain
3. Update the `from` field in `email/send.ts` to use your verified domain:
   ```typescript
   from: 'Otopair <noreply@yourdomain.com>',
   ```

For development, you can use `onboarding@resend.dev` (already configured).

## How It Works

When a user joins the waitlist:

1. **User Confirmation Email**: A welcome email is sent to the user confirming their waitlist signup
2. **Company Notification Email**: A notification email is sent to your company email with the new signup details

## Email Templates

### User Confirmation Email
- Professional welcome message
- Information about what to expect
- Call-to-action button to visit Otopair
- Branded with Otopair colors and styling

### Company Notification Email
- Clean notification format
- Displays user email and name (if provided)
- Includes timestamp
- Easy to scan for quick updates

## Testing

To test the email functionality:

1. Make sure your environment variables are set
2. Start your development server: `npm run dev`
3. Submit the waitlist form on your homepage
4. Check both:
   - The user's email inbox (confirmation email)
   - Your company email inbox (notification email)

## Troubleshooting

### Emails not sending?
- Check that `RESEND_API_KEY` is set correctly in `.env.local`
- Verify your API key is active in the Resend dashboard
- Check the server console for error messages

### Domain verification issues?
- For development, `onboarding@resend.dev` works without verification
- For production, ensure your domain is verified in Resend
- Update the `from` field in `email/send.ts` after verification

## Files

- `send.ts` - Contains the email sending functions
- `app/api/waitlist/route.ts` - API route that handles waitlist signups
- `app/page.tsx` - Form handler updated to call the API

