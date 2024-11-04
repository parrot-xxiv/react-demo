import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import Code from "@/components/ui/code"
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yLight, a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useTheme } from "./theme-provider";

const codeSyntax = `useEffect(() => {
    // Your code here (the effect)
    return () => {
        // Cleanup code here (optional)
    };
}, [dependencies]); // set empty if run only once mounted
`;

const codeExample = `import React, { useState } from 'react';

function GenerateAndCount() {
  
    const [count, setCount] = useState(0);
    const [randomNumber, setRandomNumber] = useState(0)
    
    useEffect(()=>{
        const rand = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        setRandomNumber(rand);
    },[count])


    return (
    <div>
        <p>You clicked {count} times</p>
        <p>Generated random number(100-999): {randomNumber}</p>
        <button onClick={() => setCount(count + 1)}>
            Click me
        </button>
    </div>
    );
}

export default GenerateAndCount;
`;

function UseEffectDemo() {

    const [count, setCount] = useState(0);
    const [randomNumber, setRandomNumber] = useState(0)

    useEffect(() => {
        setRandomNumber(Math.floor(Math.random() * (999 - 100 + 1)) + 100);
    }, [count])

    return <Card className="w-[350px] h-72">
        <CardHeader>
            <CardTitle>Demo</CardTitle>
            <CardDescription>It generates a new random number between 100 and 999 as the click count changes.</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="mb-5">You clicked: {count} times</p>
            <p className="mb-5">Generated random number(100-999): <code className="font-bold">{randomNumber}</code></p>
            <Button onClick={() => setCount(count + 1)} >Click me</Button>
        </CardContent>
    </Card>
}

export default function Component() {
    const { theme } = useTheme();
    const isDark = theme === 'dark'

    return <>
        <div className="flex flex-col lg:flex-row space-x-5">
            <div className="flex-1">
                <h1 className="text-2xl font-bold">useEffect</h1>
                <p className="my-10">
                    <Code className="text-blue-500">useEffect </Code>
                    is a Hook in React that allows you to add state to functional components. <br />
                    It returns an array with two elements: the current state value and a function to update that value.
                </p>
                <SyntaxHighlighter className="mb-10 rounded" language="javascript" style={isDark ? a11yDark : a11yLight}>
                    {codeSyntax}
                </SyntaxHighlighter>
                <h2 className="font-semibold text-xl my-5">Example</h2>
                <SyntaxHighlighter className="mb-10 rounded" language="javascript" style={isDark ? a11yDark : a11yLight}>
                    {codeExample}
                </SyntaxHighlighter>
            </div>
            <UseEffectDemo />
        </div>
    </>

}