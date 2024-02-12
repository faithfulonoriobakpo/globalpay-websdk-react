# GlobalPay Web SDK for Angular

This is a React library for integrating GlobalPay Payment Gateway into React applications.

## Installation

You can install this library via npm:

```bash
npm install globalpay-websdk-react

```

## Example Usage
### Import the GlobalPay Component and Payload Type if you're using Typescript

```tsx
import { GlobalPay, GeneratePaymentLinkPayload } from 'globalpay-websdk-react';

export const App = () => {
    const payload: GeneratePaymentLinkPayload = {
        amount: 200,
        secretKey: "your-secret-key",
        merchantTransactionReference: "your-reference",
        redirectUrl: "your-redirect-url",
        customer: {
            lastName: "Doe",
            firstName: "John",
            currency: "NGN",
            phoneNumber: "081000000000",
            address: "customer's address",
            emailAddress: "customer's email"
        }
    };

    const style = {
        background: 'green',
        color: 'yellow'
    };

    return (
        <>
            <GlobalPay
                apiKey="RAO5WJC3LAJ5284TB327"
                buttonText="Pay Me"
                buttonStyle={style}
                payload={payload}
            ></GlobalPay>
        </>
    )
};
```

> buttonText and buttonStyle inputs are optional. buttonText is defaulted to Pay unless specified from prop and buttonStyle is defaulted to a blue background with white text.
