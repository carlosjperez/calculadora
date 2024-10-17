import React, { useState } from 'react';
import { Plus, Minus, X, Divide, Equal } from 'lucide-react';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState('');
  const [previousValue, setPreviousValue] = useState('');
  const [operation, setOperation] = useState('');

  const handleNumberClick = (num: string) => {
    if (display === '0' || operation) {
      setDisplay(num);
      setCurrentValue(num);
    } else {
      setDisplay(display + num);
      setCurrentValue(currentValue + num);
    }
  };

  const handleOperationClick = (op: string) => {
    if (previousValue && currentValue) {
      handleEqualClick();
    }
    setOperation(op);
    setPreviousValue(currentValue);
    setCurrentValue('');
  };

  const handleEqualClick = () => {
    if (!previousValue || !currentValue) return;

    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    let result = 0;

    switch (operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        result = prev / current;
        break;
    }

    setDisplay(result.toString());
    setCurrentValue(result.toString());
    setPreviousValue('');
    setOperation('');
  };

  const handleClear = () => {
    setDisplay('0');
    setCurrentValue('');
    setPreviousValue('');
    setOperation('');
  };

  return (
    <div className="bg-blue-700 p-6 rounded-xl shadow-lg">
      <div className="bg-blue-900 p-4 mb-4 text-right text-3xl rounded-lg text-white">
        {display}
      </div>
      <div className="grid grid-cols-4 gap-3">
        {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((num) => (
          <button
            key={num}
            onClick={() => handleNumberClick(num.toString())}
            className="bg-yellow-400 text-blue-900 p-4 rounded-lg text-xl font-bold hover:bg-yellow-300 transition-colors"
          >
            {num}
          </button>
        ))}
        <button onClick={handleClear} className="bg-red-500 text-white p-4 rounded-lg text-xl font-bold hover:bg-red-600 transition-colors col-span-2">
          C
        </button>
        <button onClick={() => handleOperationClick('+')} className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-400 transition-colors">
          <Plus size={24} />
        </button>
        <button onClick={() => handleOperationClick('-')} className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-400 transition-colors">
          <Minus size={24} />
        </button>
        <button onClick={() => handleOperationClick('*')} className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-400 transition-colors">
          <X size={24} />
        </button>
        <button onClick={() => handleOperationClick('/')} className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-400 transition-colors">
          <Divide size={24} />
        </button>
        <button onClick={handleEqualClick} className="bg-green-500 text-white p-4 rounded-lg text-xl font-bold hover:bg-green-600 transition-colors">
          <Equal size={24} />
        </button>
      </div>
    </div>
  );
};

export default Calculator;