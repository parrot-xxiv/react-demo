import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup } from '@/components/ui/select';
import { Card, CardHeader, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import Code from '@/components/ui/code'

export default function Component() {

    const [currencies, setCurrencies] = useState([]);
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [conversionRate, setConversionRate] = useState(0);
    const [convertedAmount, setConvertedAmount] = useState(0);

    useEffect(() => {
        const fetchCurrencies = async () => {
            const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
            setCurrencies(Object.keys(response.data.rates));
        };

        fetchCurrencies();
    }, []);

    useEffect(() => {
        const fetchConversionRate = async () => {
            if (fromCurrency && toCurrency) {
                const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
                setConversionRate(response.data.rates[toCurrency]);
            }
        };

        fetchConversionRate();
    }, [fromCurrency, toCurrency]);

    useEffect(() => {
        setConvertedAmount(amount * conversionRate);
    }, [amount, conversionRate]);

    return (
        <div className="flex items-center justify-center">
            <Card className="mt-5 w-full lg:w-1/2">
                <CardHeader>
                    <CardTitle>Currency Converter</CardTitle>
                    <CardDescription>Using <Code>https://api.exchangerate-api.com/v4/latest/</Code> API</CardDescription>
                </CardHeader>
                <CardContent>
                    <Input
                        type="number"
                        value={amount}
                        placeholder="Amount"
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <div className='flex items-center justify-evenly my-10'>
                        <Select defaultValue={fromCurrency} onValueChange={(e) => setFromCurrency(e)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a fruit" />
                            </SelectTrigger>
                            <SelectContent>
                                {currencies.map((currency, index) => (
                                    <SelectItem key={index} value={currency}>
                                        {currency}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <span> to </span>
                        <Select defaultValue={toCurrency} onValueChange={(e) => setToCurrency(e)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a fruit" />
                            </SelectTrigger>
                            <SelectContent>
                                {currencies.map((currency, index) => (
                                    <SelectItem key={index} value={currency}>
                                        {currency}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='text-xl flex justify-center'>
                        <span>
                            <Code>{amount}</Code> {fromCurrency} 
                                &nbsp; = &nbsp; 
                            <Code>{convertedAmount.toFixed(2)}</Code> {toCurrency}
                        </span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};