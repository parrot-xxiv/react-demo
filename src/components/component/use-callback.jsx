import React, { useState, useCallback } from 'react';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

// Function to generate a random color
const randomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor.padStart(6, '0')}`; // Ensure it’s 6 characters long
};

// Child component that doesn't use memoization
const ChildWithoutCallback = ({ onClick }) => {

    const newRandomColor = randomColor()

    return <>
        <div style={{ backgroundColor: newRandomColor }}
            className="rounded p-4 my-4">
            backgroundColor is now {newRandomColor}
        </div>
        <Button onClick={onClick}>Click me</Button>
    </>
};

const ParentWithoutCallback = () => {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(c => c + 1);
    };

    return (
        <Card className="w-full md:w-[350px] h-72 m-2">
            <CardHeader>
                <CardTitle>Without useCallback</CardTitle>
                <CardDescription>Re-renders every count change</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="mb-5">Count: {count} times</p>
                <ChildWithoutCallback onClick={increment} />
            </CardContent>
        </Card>
    );
};

// Child component that uses memoization
const ChildWithCallback = React.memo(({ onClick }) => {

    const newRandomColor = randomColor()    

    return <>
        <div style={{ backgroundColor: newRandomColor }}
            className="rounded p-4 my-4">
            backgroundColor is now {newRandomColor}
        </div>
        <Button onClick={onClick}>Click me</Button>
    </>
});

const ParentWithCallback = () => {
    const [count, setCount] = useState(0);

    const increment = useCallback(() => {
        setCount(c => c + 1);
    }, []); // No dependencies, so function reference is stable

    return (
        <Card className="w-full md:w-[350px] h-72 m-2">
            <CardHeader>
                <CardTitle>With useCallback</CardTitle>
                <CardDescription>Re-renders only once, even count changes</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="mb-5">Count: {count} times</p>
                <ChildWithCallback onClick={increment} />
            </CardContent>
        </Card>
    );
};

export default function Component() {


    return <>
        <div className='flex flex-col md:flex-row'>
            <ParentWithoutCallback />
            <ParentWithCallback />
        </div>

    </>;
}