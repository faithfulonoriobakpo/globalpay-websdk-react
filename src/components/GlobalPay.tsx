import React, { useState } from 'react';

export interface GeneratePaymentLinkError {
  message: string,
  details: any
}
export interface Props {
  isLive: boolean,
  buttonText?: string,
  buttonStyle?: React.CSSProperties,
  apiKey: string,
  payload: GeneratePaymentLinkPayload,
  onError: (error: GeneratePaymentLinkError) => void,
  buttonDisabled?: boolean
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
          isLive = true,
          buttonText = "Pay",
          buttonStyle,
          apiKey, 
          payload,
          onError,
          buttonDisabled = false
        }: Props
    ) => {

  const [loading, setLoading] = useState(false);
  const liveUrl = 'https://paygw.globalpay.com.ng/globalpay-paymentgateway/api/paymentgateway/generate-payment-link';
  const testUrl = 'https://newwebservicetest.zenithbank.com:8443/new-globalpay-paymentgateway-external/api/paymentgateway/generate-payment-link';
  
  const generatePaymentLink = () => {

    const emptyKeys = findEmptyKeys(payload);

    if(!apiKey){
      return onError({message: 'API Key is required', details:null});
    }else if(!payload){
      return onError({message: 'Payload is required', details:null});
    }else if(emptyKeys.length > 0){
      const requiredFields = emptyKeys.join(', ').replace(/, (?!.*, )/, ' and ')
      return onError({message: `Payload is invalid. ${requiredFields} required`, details: null});
    }

    setLoading(true);

    fetch(
      isLive? liveUrl : testUrl,
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
    .then(
      async response => {
        if (!response.ok) {
          const errorResponse = await response.clone().json();
          throw JSON.stringify(errorResponse);
        }
        return response.json();
      }
    )
    .then((res: GeneratePaymentLinkResponse) => {
      const redirectURL = res?.data?.checkoutUrl;
      if(redirectURL) window.location.href = redirectURL;
    })
    .catch(
      error => {
        console.error(error);
        onError(
          {
            message: 'error occurred generating paymentlink',
            details: JSON.parse(error)
          }
        );
      })
    .finally(() => setLoading(false));
  };

  const findEmptyKeys = (payload: any): string[] => {

    const emptyKeys: string[] = [];
    
    for (const key in payload) {

      if(key == 'address') continue;

      if (payload.hasOwnProperty(key)) {
        if (payload[key] === null || payload[key] === undefined || payload[key] === '') {
          emptyKeys.push(key);
        } else if (typeof payload[key] === 'object') {
          const subEmptyKeys = findEmptyKeys(payload[key]);
          emptyKeys.push(...subEmptyKeys);
        }
      }
    }
    return emptyKeys;
  }

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

            button:disabled {
              opacity: 0.5;
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
          disabled={buttonDisabled}
        >
        {buttonText}
        {loading && <span className='loading-animation'></span>}
        </button>
    </div>
  );
}