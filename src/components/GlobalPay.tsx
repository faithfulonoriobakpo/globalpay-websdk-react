import React, { useState } from 'react';

export interface Props {
    buttonText?: string,
    buttonStyle?: React.CSSProperties,
    apiKey: string,
    payload: GeneratePaymentLinkPayload
}

export interface GeneratePaymentLinkPayload {
  amount: number,
  secretKey: string,
  merchantTransactionReference: string,
  redirectUrl: string,
  customer: {
    lastName: string,
    firstName: string,
    currency: string,
    phoneNumber: string,
    address: string,
    emailAddress: string
  }
}

interface GeneratePaymentLinkResponse {
  data: {
    checkoutUrl: string,
    accessCode: string,
    redirectURL: string,
    transactionReference: string,
    merchantMode: string,
    merchantCurrencies: string[]
  },
  successMessage: string,
  responseCode: string,
  isSuccessful: boolean,
  error: any
}

export const  GlobalPay = (
        {
            buttonText = "Pay",
            buttonStyle,
            apiKey, 
            payload
        }: Props
    ) => {

  const [loading, setLoading] = useState(false);
  
  const generatePaymentLink = () => {

    setLoading(true);

    fetch(
        'https://paygw.globalpay.com.ng/globalpay-paymentgateway/api/paymentgateway/generate-payment-link',
        {
            method: 'POST',
            headers: {
              'Language': 'en',
              'Content-Type': 'application/json',
              'apiKey': apiKey,
            },
            body: JSON.stringify(payload),
        }
    )
    .then(response => response.json())
    .then((res: GeneratePaymentLinkResponse) => {
      const redirectURL = res?.data?.checkoutUrl;
      if(redirectURL) window.location.href = redirectURL;
    })
    .catch(error => console.error(error))
    .finally(() => setLoading(false));
  };

  return (
    <div>
        <style>
            {`
            button {
                background-color: #007bff;
                display: flex;
                align-items: center;
                color: #fff;
                border: none;
                padding: 10px 20px;
                cursor: pointer;
                border-radius: 4px;
                font-weight: bold;
            }
            
            button.fade {
                opacity: 0.5;
            }
            
            .loading-animation {
                border: 2px solid rgba(0, 0, 0, 0.1);
                border-left-color: #fff;
                border-radius: 50%;
                width: 14px;
                height: 14px;
                animation: spin 1s linear infinite;
                display: inline-block;
            }
            
            @keyframes spin {
                to {
                    transform: rotate(360deg);
                }
            }
            `}
        </style>
        <button 
        style={buttonStyle}
        className={loading? 'fade': ''}
        onClick={generatePaymentLink}
        >
        {buttonText}
        {loading && <span className='loading-animation'></span>}
        </button>
    </div>
  );
}