# fe-challenge-001

This is a challenge for a fe-role (React)

Given a server that emulates real-time token data and transactions, your challenge is to manipulate that data
as described below.

## Server functionality
- Real-time token price updates via WebSocket
- Simulated trading activity
- REST endpoints for current state
- Mempool of recent transactions
- CORS enabled for easy frontend integration

## Installation
\`\`\`bash
npm install crypto-mempool-server
\`\`\`

Command to run locally

\`\`\`
npx ts-node src/examples/sample.ts
\`\`\`

## API Documentation
### WebSocket Events
- 'tokenUpdate': Emitted when token data is updated
- 'newTransaction': Emitted when a new transaction enters the mempool

### REST Endpoints
- GET /tokens: Get all token data
- GET /token/:symbol: Get specific token data
- GET /mempool: Get recent transactions

## Examples
See the 'examples' directory for usage examples. There are no hard rules on how the data should be display, i.e., type of charts, number of charts, etc. However, it is important to note that you should use a graph that can display the currency data over time, i.e., a line chart, but you're not limited to a line chart.

You do not need to make the site responsive, you can assume the resolution for viewing will be in 1920x1080.

You are specifically assessed on the following skills, use the following the guide what you might need to do:

    React
    TypeScript
    Styling Charts (You can use library, but do check the Challenge section)
    Working with WebSocket data
    State / Memory Management
    Data Structures

The data from the WebSocket endpoint will be in the form of a JSON string. A sample, formatted response from the WebSocket is as such:

#### /tokens/:symbol:
```json
{
  "symbol": "ETH",
  "price": 3699.566929990284,
  "volume24h": 18440902.3065846,
  "change24h": 1.865883078184814,
  "lastTrade": {
    "amount": 2.355557576458429,
    "type": "buy",
    "timestamp": 1734387983432
  }
}

```

#### /mempool
```json
{
    "hash": "wusxro6d9ob",
    "token": "PEPE",
    "amount": 199270.6310208201,
    "type": "buy",
    "timestamp": 1734387905981
  },
```

## Challenge

You are free to attempt the live-challenge in any of the following difficulties you would prefer:

1. [Easy] Implement with existing packages.
2. [Medium] Implement without using a package, but with references. Quote the references on your
   implementations in your comments (i.e., Open Source repos / Stack Overflow links).
3. [Hard] Implement without using any package & reference.

The judgement of your skill level will be different based on whichever difficulty you've chosen.

Please let us know the difficulty you've chosen and attempted.

## F.A.Q.

<details>
    <summary>Why does the repository says 001? Is there more?</summary>

    No, this is just one live-challenge exercise out of the collection we have. You're just
    a lucky fella to get the second one.  >.<!

</details>

<details>
    <summary>This take home is too difficult, can I ask for another one?</summary>

    No, the other task are all similar in difficulty, with 3 difficulty levels. So there
    won't be much difference even if I give u other tasks.

</details>

<details>
    <summary>Why this task?</summary>

    The task is designed to test the handling of live WebSocket data in React.

</details>

<details>
    <summary>I have more questions</summary>

    Feel free to reach out to ask more questions to whoever you are contacting with.

    Asking questions / guidance / hints do not penalize anything. Unless the questions
    may give too much answers, then we'll let you know before we answer.

</details>