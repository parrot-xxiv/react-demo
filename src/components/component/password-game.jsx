import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const fetchGameData = async () => {
  const [ipResponse, countriesResponse, ratesResponse, pokeResponse] = await Promise.all([
    fetch('https://api.ipify.org/'),
    fetch('https://restcountries.com/v3.1/all?fields=name,flags'),
    fetch('https://api.exchangerate-api.com/v4/latest/USD'),
    fetch(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 300) + 1}`)
  ]);

  const ipAddress = await ipResponse.text();
  const countries = await countriesResponse.json();
  const { rates } = await ratesResponse.json();
  const { name: pokeName, sprites } = await pokeResponse.json();

  return {
    ipAddress,
    phpRate: rates.PHP,
    countries,
    poke: sprites.front_default,
    pokeName
  };
};

const romanNumerals = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];

export const passwordRequirements = (gameStateData, lastPart) => [
  { message: "Must be at least 5 characters", check: (password) => password.length >= 5 },
  { message: "Must contain a number", check: (password) => /\d/.test(password) },
  { message: "Must contain an uppercase letter", check: (password) => /[A-Z]/.test(password) },
  { message: "Must contain a special character", check: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  { message: "Must contain a Roman numeral", check: (password) => romanNumerals.some((r) => password.includes(r)) },
  { message: `Must include the country name`, check: (password) => password.toLowerCase().includes(gameStateData.countryName) },
  { message: "Must contain the PHP exchange rate", check: (password) => password.includes(gameStateData.phpRate.toString()) },
  { message: `Must include the Pokémon name`, check: (password) => password.toLowerCase().includes(gameStateData.pokeName) },
  { message: "Must contain the last part of your IP address", check: (password) => password.includes(lastPart) },
  {
    message: "Digits must sum to 50", check: (password) => {
      const digits = password.match(/\d/g);
      return digits && digits.reduce((acc, digit) => acc + parseInt(digit, 10), 0) === 50;
    }
  }
];

export const checkPasswordStrength = (strength) => {
  const strengthLevels = [
    { label: 'Very Weak', width: '10%', color: 'bg-red-600' },
    { label: 'Weak', width: '20%', color: 'bg-orange-500' },
    { label: 'Fair', width: '30%', color: 'bg-orange-600' },
    { label: 'Good', width: '40%', color: 'bg-lime-500' },
    { label: 'Strong', width: '50%', color: 'bg-teal-500' },
    { label: 'Very Strong', width: '60%', color: 'bg-blue-500' },
    { label: 'Excellent!', width: '75%', color: 'bg-indigo-500' },
    { label: 'Almost Godlike', width: '90%', color: 'bg-purple-500' },
    { label: 'Godlike!', width: '100%', color: 'bg-purple-400' },
    { label: 'Beyond Godlike!!!', width: '100%', color: 'bg-green-500 animate-shake' }
  ];

  return strengthLevels[strength];
};

export default function Component() {

  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [strengthText, setStrengthText] = useState('');
  const [gameState, setGameState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [requirements, setRequirements] = useState([]);

  useEffect(() => {
    const initGameData = async () => {
      const { ipAddress, phpRate, countries, poke, pokeName } = await fetchGameData();
      const lastPart = ipAddress.split('.')[3];
      const countryIndex = Math.floor(Math.random() * countries.length);
      const countryName = countries[countryIndex].name.common.toLowerCase().replace(/\s+/g, '');

      const gameStateData = { phpRate, poke, pokeName, countryName, countryFlag: countries[countryIndex].flags.png };
      setGameState(gameStateData);

      setRequirements(passwordRequirements(gameStateData, lastPart));
      setIsLoading(false);
    };

    initGameData();
  }, []);

  const handleInput = (password) => {
    setPasswordValue(password);
    const unmetRequirement = requirements.find((req) => !req.check(password));
    setFeedback(unmetRequirement ? unmetRequirement.message : '');

    const strengthScore = requirements.filter((req) => req.check(password)).length;
    const { label, width, color } = checkPasswordStrength(strengthScore);
    setStrengthText(label);
    setPasswordStrength(width);
  };

  const handleSubmit = () => {
    if (passwordValue !== confirmPassword) {
      alert("Passwords do not match!");
    } else {
      alert("Password submitted!");
    }
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

          {gameState && (
            <div className="mt-4 flex flex-col justify-center items-center">
              {/* Show country flag only if the country name requirement is not met */}
              {!requirements[5].check(passwordValue) && (
                <img src={gameState.countryFlag} alt="Country Flag" className="mb-2" />
              )}

              {/* Show Pokémon image only if the Pokémon name requirement is not met */}
              {!requirements[7].check(passwordValue) && (
                <img src={gameState.poke} alt="Pokemon" className="h-40 mb-2" />
              )}
            </div>
          )}

          <div className="h-2 bg-gray-300 rounded mb-2">
            <div
              id="password-strength"
              className={`h-2 rounded ${strengthText === 'Beyond Godlike!!!' ? 'bg-green-500 animate-shake' : 'bg-blue-500'}`}
              style={{ width: passwordStrength }}
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