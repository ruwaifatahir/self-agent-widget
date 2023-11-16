## Getting Started

Install the dependencies

```bash
pnpm install
```

Create a file named `.env.local`, copy the contents from `.env.example`, and then populate it with appropriate values.

Run the development server

```bash
pnpm dev
```

## Use the widget

Before starting make sure you are verified Self agent.

## Using Wagmi and Viem

First, create an IframeRenderer component to embed the Self agent widget into your application via an `<iframe>`. It's responsible for rendering the widget and facilitating communication between your application and the widget.

```typescript
// IframeRenderer.tsx

import { useEffect } from "react";

const IframeRenderer: React.FC<IframeRendererProps> = ({
  isInjectedWallet,
  address,
}) => {
  useEffect(() => {
    if (!isInjectedWallet) return;

    const timer = setTimeout(() => {
      document.querySelector("iframe")?.contentWindow?.postMessage(
        { type: "updateAccount", account: address },
        "*"
      );
    }, 2000);

    return () => clearTimeout(timer);
  }, [address, isInjectedWallet]);

  return (
    <iframe
      height={700}
      width={400}
      src={`${WIDGET_URL}?agent=${AGENT_ADDRESS}`}
    />
  );
};
```

The useEffect hook in the IframeRenderer component is used for sending the connected user address to the widget inside the iframe. This is done to ensure that the widget has the current account address, which is necessary for its functionality. The setTimeout within useEffect introduces a delay, allowing time for the iframe to load and be ready to receive this data. The check for isInjectedWallet ensures that this process only occurs if the connected wallet is injected wallet.

Now let's just pass the boolean indicating if wallet is injected or not and address of connected user.

```typescript
  const { connector } = useAccount();

   <IframeRenderer
        address={address as Address}
        isInjectedWallet={
          connector?.id === "injected" || connector?.id === "eip6963"
        }
      />
```

Check the entire code for widget integration [here](https://github.com/selfcrypto/self-examples/tree/main/agent-widget-integration/wagmi-viem)

## Add new payment token

1. Add a key-value pair to the `PAY_TKN_ADDRESSES` object located in _src/utils/constants/addresses.ts_.

```typescript
import { Address } from "viem";

export const SELF_TKN_ADDR = process.env.NEXT_PUBLIC_SELF_TOKEN as Address;
export const SELF_NFT_ADDON_ADDR = process.env
  .NEXT_PUBLIC_SELF_NFT_ADDON_ADDR as Address;

export const PAY_TKN_ADDRESSES = {
  usdt: process.env.NEXT_PUBLIC_USDT as Address,
  //   Add new key/value pair HERE...
};
```

2. Add a new option in `Select` located in _src/utils/components/register/registerInputContainer/AssetSelector.tsx_.

```html
<InputGroup>
  <input py="{7}" borderColor="blackAlpha.600" rounded="md" />
  <InputRightElement h="full" mr="{2}" w="10%" zIndex="{1000}">
    <select onChange="{handleSelectChange}">
      <option value="self">SELF</option>
      <option value="usdt">USDT</option>
      <!-- Add new option HERE... -->
    </select>
  </InputRightElement>
</InputGroup>
```
