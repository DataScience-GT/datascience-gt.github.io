Use this template to build your `src/creds.ts`

```ts
export const api_key = {
  "key": "" /* Available from https://console.developers.google.com/apis/credentials?project=dsgt-website, key named "Sheets Access Key" */
}

export const service_creds = {
  /* Ask Raj For this body **/ 
}

export const sheet = {
  sheet_id: "", /* Copy the Sheet ID from the current budget file in drive */ 
  ledger_sheet: "VenmoLedger", 
  dues_sheet: "Dues"
}

```