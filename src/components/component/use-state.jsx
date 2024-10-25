import { useContext, useState } from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import Code from '@/components/ui/code'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { a11yLight, a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useTheme } from "./theme-provider";

const codeString = `
import React, {useState} from 'react';

function Counter() {
// Declare a state variable named "count", initialized to 0
const [count, setCount] = useState(0);

return (
  <div>
    <p>You clicked {count} times</p>
    <button onClick={() => setCount(count + 1)}>
      Click me
    </button>
  </div>
);
}

export default Counter;
`;

function UseStateDemo() {

  const [count, setCount] = useState(0);

  return <Card className="w-[350px] h-56">
    <CardHeader>
      <CardTitle>Demo</CardTitle>
      <CardDescription>This simple example shows how `useState` can manage state in a functional component</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="mb-5">You clicked: {count} times</p>
      <Button onClick={() => setCount(count + 1)} >Click me</Button>
    </CardContent>
  </Card>
}

export default function Component() {

  const { theme } = useTheme();
  const isDark = theme === 'dark'

  return <>
    <div className="flex flex-col lg:flex-row lg:space-x-10">
      <div className="flex-1">
        <h1 className="text-2xl font-bold">useState</h1>
        <p className="my-10">
          <code className="text-blue-500">useState </code>
          is a Hook in React that allows you to add state to functional components. <br />
          It returns an array with two elements: the current state value and a function to update that value.
        </p>
        <SyntaxHighlighter className="mb-10 rounded" language="javascript" style={isDark ? a11yDark : a11yLight}>{codeString}</SyntaxHighlighter>
        <h2 className="font-semibold text-xl mb-2">Explanation:</h2>
        <ol className="list-decimal list-inside">
          <li>
            <strong>Importing <Code>useState</Code></strong>: You need to import <Code>useState</Code> from React.
          </li>
          <li>
            <strong>Declaring State</strong>: <Code>const [count, setCount] = useState(0);</Code> initializes the state variable <Code>count</Code> with a value of 0.
          </li>
          <li>
            <strong>Updating State</strong>: When the button is clicked, <Code>setCount(count + 1)</Code> updates the <Code>count</Code> state, causing the component to re-render with the new count.
          </li>
        </ol>
      </div>
      <UseStateDemo />
    </div>
  </>

}