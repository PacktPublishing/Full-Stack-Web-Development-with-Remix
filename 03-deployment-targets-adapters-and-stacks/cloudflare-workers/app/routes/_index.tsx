import type { MetaFunction } from "@remix-run/cloudflare";
import { useEffect, useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

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
