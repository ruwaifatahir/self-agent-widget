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

Before starting make sure you are a verified Self agent.

Integrating the Self Agent widget is as simple as using the `iframe` tag and passing the URL. However, a bug in Metamask causes addresses to become unsynchronized between the iframe and the parent site when switching accounts. To address this issue, incorporate the code from your preferred library (ethers.js, viem, wagmi, etc.) below. This code ensures that the connected account's address is synchronized in both the iframe and the parent app when there is a change in the Metamask account.

### Using Wagmi

```typescript
// IframeRenderer.tsx

import { useEffect } from "react";

const IframeRenderer: React.FC<IframeRendererProps> = ({
  isInjectedWallet,
  address,
}) => {
  useEffect(() => {
    // If wallet is not connected, don't send the message
    // If there is no injected wallet, do nothing
    if (!address || !isInjectedWallet) return;

    // wait 2 seconds for the wallet to be connected and iframe to be ready
    // send a message to the iframe
    const timer = setTimeout(() => {
    // message contains address of the currently connected account whenever it changes
    // This is to sync the account in parent with the account in the widget
      document.querySelector("iframe")?.contentWindow?.postMessage(
        { type: "updateAccount", account: address },
        "*"
      );
    }, 2000);

    // Clear the timeout when the component unmounts or dependencies change
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

```typescript
  //index.tsx
  const { connector, address } = useAccount();

   <IframeRenderer
        address={address as Address}
        isInjectedWallet={
          connector?.id === "injected" || connector?.id === "eip6963"
        }
      />
```


Check the entire code for widget integration using wagmi [here](https://github.com/selfcrypto/self-examples/tree/main/agent-widget-integration/with-wagmi)

### Using Ethers

```typescript
//IframeRenderer.tsx
import { useEffect } from "react";

// Constants for widget URL and agent address
const WIDGET_URL = "https://self-agent-widget.vercel.app/";
const AGENT_ADDRESS = "0x7ffffd377d0030d3a7c558f67407f0ec2c426537";

// TypeScript interface for the component's props
interface IframeRendererProps {
  isInjectedWallet: boolean;
  address: string;
}

// The IframeRenderer component
const IframeRenderer: React.FC<IframeRendererProps> = ({
  isInjectedWallet,
  address,
}) => {
  useEffect(() => {
    // If wallet is not connected, don't send the message
    // If there is no injected wallet, do nothing
    if (!address || !isInjectedWallet) return;

    // wait 2 seconds for the wallet to be connected and iframe to be ready
    // send a message to the iframe
    const timer = setTimeout(() => {
      // message contains address of the currently connected account whenever it changes
      // This is to sync the account in parent with the account in the widget
      document
        .querySelector("iframe")
        ?.contentWindow?.postMessage(
          { type: "updateAccount", account: address },
          "*"
        );
    }, 2000);

    // Clear the timeout when the component unmounts or dependencies change
    return () => clearTimeout(timer);
  }, [address, isInjectedWallet]);

  // Render the iframe element
  return (
    <iframe
      height={700}
      width={400}
      src={`${WIDGET_URL}?agent=${AGENT_ADDRESS}`}
      title="Self Agent Widget"
      // TODO: Replace the src attribute with the URL of the iframe if needed
    />
  );
};

export default IframeRenderer;
```

```typescript
//App.tsx
{/* ethers js only implements injected wallet */}
{/* just pass connected address in IframeRenderer and you are good to go */}
<IframeRenderer address={address} isInjectedWallet={true} />
```
Check the entire code for widget integration using ethers.js [here](https://github.com/selfcrypto/self-examples/tree/main/agent-widget-integration/with-ethers)

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
