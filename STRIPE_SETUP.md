# Stripe Payment Integration Setup

This project uses Stripe for secure payment processing. Follow these steps to set up Stripe:

## 1. Create a Stripe Account

1. Go to [stripe.com](https://stripe.com) and create an account
2. Complete the account verification process
3. Access your Stripe Dashboard

## 2. Get Your API Keys

1. In your Stripe Dashboard, go to **Developers** > **API keys**
2. Copy your **Publishable key** and **Secret key**
3. Make sure you're using **Test keys** for development

## 3. Set Up Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
```

## 4. Test Card Numbers

Use these test card numbers for testing:

- **Visa**: 4242 4242 4242 4242
- **Visa (debit)**: 4000 0566 5566 5556
- **Mastercard**: 5555 5555 5555 4444
- **American Express**: 3782 822463 10005

**Expiry Date**: Any future date (e.g., 12/25)
**CVC**: Any 3 digits (e.g., 123)

## 5. Test Payment Scenarios

### Successful Payment

- Use any of the test card numbers above
- Enter any future expiry date
- Enter any 3-digit CVC

### Failed Payment

- Use card number: 4000 0000 0000 0002
- This will simulate a declined payment

### Insufficient Funds

- Use card number: 4000 0000 0000 9995
- This will simulate insufficient funds

## 6. Production Deployment

When deploying to production:

1. Switch to **Live keys** in your Stripe Dashboard
2. Update your environment variables with live keys
3. Ensure your domain is added to allowed origins in Stripe Dashboard
4. Set up webhook endpoints for order confirmation

## 7. Security Notes

- Never commit your `.env.local` file to version control
- Keep your secret key secure and never expose it in client-side code
- Use test keys for development and live keys only for production
- Monitor your Stripe Dashboard for any suspicious activity

## 8. Features Implemented

- ✅ Secure payment processing with Stripe Elements
- ✅ Real-time payment validation
- ✅ Error handling for failed payments
- ✅ Success/failure feedback to users
- ✅ Automatic cart clearing after successful payment
- ✅ Responsive design for all devices

## 9. Troubleshooting

### Common Issues:

1. **"Invalid API key" error**

   - Check that your environment variables are correctly set
   - Ensure you're using the correct key type (test vs live)

2. **"Payment failed" error**

   - Verify you're using a valid test card number
   - Check the Stripe Dashboard for detailed error logs

3. **"Network error"**
   - Ensure your internet connection is stable
   - Check if Stripe services are available

For more help, refer to the [Stripe Documentation](https://stripe.com/docs).
