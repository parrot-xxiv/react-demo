import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function Component() {
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [strengthText, setStrengthText] = useState('');
  const [gameState, setGameState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [requirements, setRequirements] = useState([]);

  const romanNumerals = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];

  useEffect(() => {
    const fetchData = async () => {
      const [ipResponse, countriesResponse, ratesResponse, pokeResponse] = await Promise.all([
        fetch('https://api.ipify.org/'),
        fetch('https://restcountries.com/v3.1/all?fields=name,flags'),
        fetch('https://api.exchangerate-api.com/v4/latest/USD'),
        fetch(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 300) + 1}`),
      ]);

      const ipAddress = await ipResponse.text();
      const parts = ipAddress.split('.');
      const lastPart = parts[3];
      parts[3] = '???';

      const countries = await countriesResponse.json();
      const { rates } = await ratesResponse.json();
      const countryIndex = Math.floor(Math.random() * countries.length);
      const { name: pokeName, sprites } = await pokeResponse.json();

      const gameStateData = {
        ipAddress,
        phpRate: rates.PHP,
        countryFlag: countries[countryIndex].flags.png,
        countryName: countries[countryIndex].name.common.toLowerCase().replace(/\s+/g, ''),
        poke: sprites.front_default,
        pokeName: pokeName.toLowerCase().replace(/\s+/g, ''),
      };

      setGameState(gameStateData);

      setRequirements([
        { message: "Must be at least 5 characters", check: (password) => password.length >= 5 },
        { message: "Must contain a number", check: (password) => /\d/.test(password) },
        { message: "Must contain an uppercase letter", check: (password) => /[A-Z]/.test(password) },
        { message: "Must contain a special character", check: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password) },
        { message: "Must contain a Roman numeral", check: (password) => romanNumerals.some((r) => password.includes(r)) },
        { message: `Must include the name of this country`, check: (password) => password.toLowerCase().includes(gameStateData.countryName) },
        { message: "Must contain the value of USD in PHP today", check: (password) => password.includes(gameStateData.phpRate.toString()) },
        { message: `Must include the name of this pokemon`, check: (password) => password.toLowerCase().includes(gameStateData.pokeName) },
        { message: "Must contain the last part of your IP address", check: (password) => password.includes(lastPart) },
        { message: "Digits must sum to 50", check: checkSumOfDigits },
      ]);

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const checkSumOfDigits = () => {
    const digits = passwordValue.match(/\d/g);
    if (!digits) return false;
    const sum = digits.reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    return sum === 50;
  };

  const handleInput = (password) => {
    setPasswordValue(password);
    let msg = '';
    const results = requirements.map((req) => req.check(password));
    const req = results.findIndex((e) => !e);
    if (req !== -1) msg = requirements[req].message;
    const passwordStrength = results.filter(Boolean).length;
    setFeedback(msg);
    checkPasswordStrength(passwordStrength);
  };

  const checkPasswordStrength = (strength) => {
    const strengthClasses = [
      { className: 'bg-red-500', label: 'Very Weak', width: '0%' },
      { className: 'bg-red-600', label: 'Weak', width: '10%' },
      { className: 'bg-orange-500', label: 'Fair', width: '20%' },
      { className: 'bg-orange-600', label: 'Moderate', width: '30%' },
      { className: 'bg-lime-500', label: 'Good', width: '40%' },
      { className: 'bg-teal-500', label: 'Strong', width: '50%' },
      { className: 'bg-blue-500', label: 'Very Strong', width: '60%' },
      { className: 'bg-indigo-500', label: 'Excellent!', width: '75%' },
      { className: 'bg-purple-500', label: 'Almost Godlike', width: '90%' },
      { className: 'bg-purple-400', label: 'Godlike!', width: '100%' },
      { className: 'bg-green-500 animate-shake', label: 'Beyond Godlike!!!', width: '100%' },
    ];

    const { className, label, width } = strengthClasses[strength];
    setStrengthText(label);
    setPasswordStrength((strength + 1) * 10);  // Ensure it's a percentage.
  };

  const handleSubmit = () => {
    if (passwordValue !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password submitted!");
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Card className="w-80 p-6 shadow-md rounded-lg">
          <h2 className="text-lg font-bold mb-4">Enter New Password</h2>
          <Input
            id="password"
            type="text"
            placeholder="New Password"
            value={passwordValue}
            onChange={(e) => handleInput(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded mb-4"
          />
          <Input
            id="password-confirm"
            type="text"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded mb-4"
          />
          
          {/* Show country flag and Pokémon image depending on displayed requirements*/}
          {gameState && (
            <div className="mt-4 flex flex-col justify-center items-center">
              <img src={gameState.countryFlag} alt="Country Flag" className="mb-2" />
              <img src={gameState.poke} alt="Pokemon" className="h-40 mb-2" />
            </div>
          )}

          <div className="h-2 bg-gray-300 rounded mb-2">
            <div
              id="password-strength"
              className={`h-2 rounded ${strengthText === 'Beyond Godlike!!!' ? 'bg-green-500 animate-shake' : 'bg-blue-500'}`}
              style={{ width: `${passwordStrength}%` }}
            ></div>
          </div>
          <p className="text-sm">{strengthText}</p>
          {feedback && <p className="text-xs italic text-red-500">{feedback}</p>}
          <Button className="w-full mt-4" onClick={handleSubmit}>
            Submit
          </Button>
        </Card>
      )}
    </div>
  );
}
