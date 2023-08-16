# Token Provider

## Setup the provider

The Token Provider has been built on top of the BigQuery Provider (BigQuery allows to fetch any information from Ethereum and Polygon blockchains).
But BigQuery isn't free and require an API Token. (You can still try it for free on this link: https://cloud.google.com/free?hl=fr)

### Get an API Token

- First you need to authenticate to Google Cloud:
  - Download google cloud CLI here: https://cloud.google.com/sdk/docs/install-sdk.
  - OR On macOS you can use directly this homebrew command: `brew install --cask google-cloud-sdk`
- Then run `gcloud auth login` and sign in through the web interface
- Then run `gcloud config set project <YOUR_PROJECT_ID>` (YOUR_PROJECT_ID is write on your google cloud home page)
- Activate IAM API through this page https://cloud.google.com/iam/docs/creating-managing-service-account-keys?hl=fr
- Create a service account on this page https://console.cloud.google.com/iam-admin/serviceaccounts/create
- Add "BigQuery Admin" role
- On https://console.cloud.google.com/iam-admin/serviceaccounts create a new key (json format), the json file of the key will be downloaded (click on action button => "manage keys" => "ADD KEY" => "create a new key" => (JSON) "Create").

### Set the token

- Create the .env file:

```bash
# in a new Terminal, at sismo-hub project root
cp .example.env .env
```

- Insert your Access token here: `export GOOGLE_APPLICATION_CREDENTIALS="your_access_token"`.
  Replace `your_access_token` with the content of the json file you just created.
- Then run: `source .env`. This command allows you to export all environment variables defined in the .env file (including the Google access token you just setup) and use it in the Sismo Hub application.

---

## Use the provider

### Methods

- `getERC20Holders`
- `getERC721Holders`
- `getERC1155Holders`

<br>

#### getERC20Holders

This method allows you to fetch all the holders of one ERC20 token.
The value of each group member is the number of token he owns in [wei](https://www.investopedia.com/terms/w/wei.asp).

There are 6 arguments to give to this method:

- `contractAddress`,
- `network`,
- `minAmount`,
- `forcedValue`,
- `snapshot`

#### getERC721Holders

This method allows you to fetch all the holders of one ERC721 token.
The value of each group member is the number of token he owns.

There are 5 arguments to give to this method:

- `contractAddress`,
- `network`,
- `minAmount`,
- `forcedValue`,
- `snapshot`

#### getERC1155Holders

This method allows you to fetch all the holders of one ERC1155 token.
The value of each group member is the number of token he owns.

There are 5 arguments to give to this method:

- `contractAddress`,
- `tokenId`,
- `network`,
- `minAmount`,
- `snapshot`

<br>

#### Arguments

- `contractAddress` : The address of the Token contract.
- `network` : (optional) The network name or ID of the Token. Available networks: mainnet, polygon. Default: mainnet.
- `minAmount` : (optional) The minimum of token required (in [wei](https://www.investopedia.com/terms/w/wei.asp)) for the account to be fetched.
- `forcedValue` : (optional) Replace the number of token as value for a forced value predefined
- `snapshot` : (optional) Fetch all the holders before this snapshot date (e.g: "2022-01-25 02:00:00")
- `tokenId`: (optional) Fetch all the holders of this tokenId. If no tokenID is specify, the function will fetch the holders of all tokenIds.

The format of the object returned by the methods:

```json
{
  "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045": "10",
  "0x8ab1760889F26cBbf33A75FD2cF1696BFccDc9e6": "103"
}
```

The key is the address and the value is the balance.

<br>

### Usage

- Instantiate the Token Provider:

  ```TypeScript
  const tokenProvider = new dataProviders.TokenProvider();
  ```

- Then use one of the Token Provider methods. For example :

  ```TypeScript
  const tokenProviderData0 = await tokenProvider.getERC20Holders({
    network: "mainnet",
    contractAddress: "0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9",
  });
  ```

Here you will fetch all $AAVE ERC-20 holders on Ethereum mainnnet.

Finally, you will get a [FetchedData](../src/topics/group/group.types.ts) object in return (which can the be used to generate a Data Group). Here is a sample of it:

```json
{
  "0x000000000035b5e5ad9019092c665357240f594e": "53",
  "0x00000000003b3cc22af3ae1eac0440bcee416b40": "38218189226640",
  "0x00000000006004dfb6ab427a47994f2a6a4f6334": "457869010561047158",
  "0x0000000000710a9c1f6db5f504be77ffb3b583ec": "1"
  ...
}
```
