import { useEffect, useState } from "react";

export default function Index() {
  const [userAgent, setUserAgent] = useState('the World');
  useEffect(() => {
    setUserAgent(navigator.userAgent);
  }, []);
  console.log(`Another hello to ${userAgent}!`);
  return (
    <h1>Hello to {userAgent}!</h1>
  );
}
