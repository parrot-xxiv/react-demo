import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardDescription, CardTitle, CardFooter } from "@/components/ui/card";


const ExpensiveCalculationComponent = () => {
    const [count, setCount] = useState(0);

    // Simulating an expensive calculation
    const expensiveCalculation = () => {
        let result = 0;
        for (let i = 0; i < 1e8; i++) {
            result += i;
        }
        return result;
    };

    const start = performance.now();
    const largeNumber = expensiveCalculation();
    const end = performance.now();
    const timeTaken = end - start;

    return (
        <Card className="w-full md:w-[350px] m-2">
            <CardHeader>
                <CardTitle>Without useMemo</CardTitle>
                <CardDescription>Calculation took {timeTaken.toFixed(2)} milliseconds</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="mb-5">Count: {count}</p>
            </CardContent>
            <CardFooter>
                <Button onClick={() => setCount(count + largeNumber)}>Increment</Button>
            </CardFooter>
        </Card>
    );
};

const MemoizedCalculationComponent = () => {
    const [count, setCount] = useState(0);

    // Simulating an expensive calculation
    const expensiveCalculation = () => {
        let result = 0;
        for (let i = 0; i < 1e8; i++) {
            result += i;
        }
        return result;
    };

    // Using useMemo to memoize the calculation
    const start = performance.now();
    const largeNumber = useMemo(() => {
        return expensiveCalculation();
    }, []);
    const end = performance.now();
    const timeTaken = end - start;

    return (
        <Card className="w-full md:w-[350px] m-2" >
            <CardHeader>
                <CardTitle>With useMemo</CardTitle>
                <CardDescription>Calculation took {timeTaken.toFixed(2)} milliseconds</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="mb-5">Count: {count}</p>
            </CardContent>
            <CardFooter>
                <Button onClick={() => setCount(count + largeNumber)}>Increment</Button>
            </CardFooter>
        </Card >
    );
};

export default function Component() {
    return (
        <div className='flex flex-col md:flex-row'>
            <ExpensiveCalculationComponent />
            <MemoizedCalculationComponent />
        </div>
    );
}
