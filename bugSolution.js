```javascript
// pages/index.js
import { Suspense } from 'react';

async function fetchData() {
  const response = await fetch('/api/data');
  const data = await response.json();
  return data;
}

export default function Home() {
  const data = useAsync(fetchData);

  return (
    <div>
      <h1>Welcome to my Next.js app</h1>
      <Suspense fallback={<div>Loading...</div>}>
        {data.status === 'success' ? (
          <div>Data: {JSON.stringify(data.value)}</div>
        ) : (
          <div>Error: {data.error?.message}</div>
        )}
      </Suspense>
    </div>
  );
}

function useAsync(asyncFunction) {
  const [data, setData] = React.useState({ status: 'pending' });

  React.useEffect(() => {
    asyncFunction().then(
      (data) => setData({ status: 'success', value: data }),
      (error) => setData({ status: 'error', error })
    );
  }, [asyncFunction]);

  return data;
}

// pages/api/data.js

export default async function handler(req, res) {
  res.status(200).json({ message: 'Hello from API' });
}
```