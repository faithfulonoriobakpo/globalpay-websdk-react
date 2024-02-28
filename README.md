# GlobalPay Library for React

This is a React library for integrating GlobalPay Payment Gateway into React applications.

## Installation

You can install this library via npm:

```bash
npm install @zenith/globalpay-react

```

## Example Usage
### Import the GlobalPay Component and Payload Type if you're using Typescript

```tsx
import { GlobalPay, GeneratePaymentLinkPayload } from '@zenith/globalpay-react';

export const App = () => {
    const payload: GeneratePaymentLinkPayload = {
        amount: 200,
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

    function onError(error) {
        console.log(error);
    }

    return (
        <>
            <GlobalPay
                apiKey="your-api-key"
                buttonText="Pay Me"
                buttonStyle={style}
                payload={payload}
                onError={onError}
            ></GlobalPay>
        </>
    )
};
```

> buttonText and buttonStyle inputs are optional. buttonText is defaulted to Pay unless specified from prop and buttonStyle is defaulted to a blue background with white text.

> isLive is defaulted to true
