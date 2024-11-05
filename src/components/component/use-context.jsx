import React, { useContext, createContext, useState } from 'react';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import Code from '@/components/ui/code'
// Create the Counter Context
const CounterContext = createContext();

// Create a provider component to manage the counter state
const CounterProvider = ({ children }) => {
    const [count, setCount] = useState(0);

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);

    return (
        <CounterContext.Provider value={{ count, increment, decrement }}>
            {children}
        </CounterContext.Provider>
    );
};

const CounterDisplay = () => {
    const { count } = useContext(CounterContext);

    return (
        <Card className="w-full md:w-[350px] m-2" >
            <CardHeader>
                <CardTitle>&lt;CounterDisplay/&gt;</CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
                <p className="mb-5 text-2xl">{count}</p>
            </CardContent>
        </Card >

    );
};

const CounterControls = () => {
    const { increment, decrement } = useContext(CounterContext);

    return (
        <Card className="w-full md:w-[350px] m-2" >
            <CardHeader>
                <CardTitle>&lt;CounterControls/&gt;</CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="flex space-x-5">
                <Button onClick={decrement}>Decrement</Button>
                <Button onClick={increment}>Increment</Button>
            </CardContent>
        </Card >
    );
};

export default function Component() {
    return (
        <CounterProvider>
            <div>
                <h1 className='text-2xl font-bold'>useContext</h1>
                <p className='my-10'>This simple counter app illustrates the core functionality of <Code>useContext</Code> in React. It shows how we can manage shared state globally and avoid prop-drilling in a clean and efficient way, even in a small example.</p>
                <CounterDisplay />
                <CounterControls />
                <div>
                    <h2 className='font-semibold text-xl my-5'>How It Works:</h2>
                    1. <Code>CounterContext:</Code>
                    <br />
                    - We create a CounterContext using createContext to hold the current counter value and functions (increment and decrement) that allow us to modify the counter.
                    <br /><br />
                    2. <Code>CounterProvider:</Code>
                    <br />
                    - The CounterProvider component holds the counter state and provides it to all child components through CounterContext.Provider.
                    <br /><br />
                    3. <Code>useContext:</Code>
                    <br />
                    - In the CounterDisplay component, we use useContext(CounterContext) to access and display the current value of count.
                    <br />
                    - In the CounterControls component, we use useContext(CounterContext) to access the increment and decrement functions and link them to the buttons.
                    <br /><br />
                    4. <strong>Global Counter State:</strong>
                    <br />
                    - The count value is globally available to any child component of CounterProvider. Components don't need to pass the counter value via props; they can access it directly using useContext.
                </div>
            </div>
        </CounterProvider>
    );
};

