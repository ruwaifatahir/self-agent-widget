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

You can integrate the widget by using an `iframe` and passing agent address in the
query param.

```html
<iframe
  src="https://self-agent-dashboard-template.vercel.app/?agent=0x14B4a2935fCcd6634e868Dc52c83e76A12eD6ec6"
></iframe>
```

## Add new payment token

1. Add a key-value pair to the `PAY_TKN_ADDRESSES` object located in _src/utils/constants/addresses.ts_.

```typescript
import { Address } from "viem";

export const SELF_TKN_ADDR = process.env.NEXT_PUBLIC_SELF_TOKEN as Address;
export const SELF_NFT_ADDON_ADDR = process.env
  .NEXT_PUBLIC_SELF_NFT_ADDON as Address;

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
