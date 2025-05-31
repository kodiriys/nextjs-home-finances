This is a [Next.js](https://nextjs.org) based Finance Dashboard.

![Working example](https://github.com/kodiriys/nextjs-home-finances/blob/main/public/WorkingExampleOutput.png?raw=true)

Put your data into the `/public/spending.json` file like below. Then run `pnpm dev` to see your visualizations on [http://localhost:3000](http://localhost:3000) in your browser!

```json
[
  {
    "period": "2025-03",
    "total": 3821.55,
    "categories": [
      { "category": "Books", "amount": 45.99 },
      { "category": "Transportation", "amount": 120.5 },
      { "category": "Dining", "amount": 301.2 },
      { "category": "Groceries", "amount": 642.35 },
      { "category": "Utilities", "amount": 132.87 },
      { "category": "Health", "amount": 230.5 },
      { "category": "Shopping", "amount": 713.25 },
      { "category": "Entertainment", "amount": 57.99 },
      { "category": "Gifts", "amount": 99.95 },
      { "category": "Rent", "amount": 1477.95 }
    ]
  },
  ...
]

```
