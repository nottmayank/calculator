import { useState, useEffect } from 'react';
import "../src/app/globals.css";

export default function Home() {
  const [display, setDisplay] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);

  const handleClick = (value: string) => {
    if (value === 'AC') {
      setDisplay('');
    } else if (value === 'C') {
      setDisplay(display.slice(0, -1));
    } else if (value === '=') {
      try {
        const result = eval(display).toString();
        setHistory([...history, display + ' = ' + result]);
        setDisplay(result);
      } catch {
        setDisplay('Error');
      }
    } else {
      setDisplay(display + value);
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    const key = event.key;
    if (key === 'Enter') {
      handleClick('=');
    } else if (key === 'Backspace') {
      handleClick('C');
    } else if (key === 'Escape') {
      handleClick('AC');
    } else if (['/', '*', '-', '+', '.', '%'].includes(key) || (key >= '0' && key <= '9')) {
      handleClick(key);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [display]);

  return (
    <main className='main'>
      <div className="calc-con">
        <div className="calc">
          <div className="display">
            <ul>
              {history.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            <h2>{display}</h2>
          </div>
          <div className="buttons">
            <div>
              <a href="#" onClick={() => handleClick('C')} className="dark">C</a>
              <a href="#" onClick={() => handleClick('AC')} className="dark">AC</a>
              <a href="#" onClick={() => handleClick('%')} className="dark">%</a>
              <a href="#" className="dark" onClick={() => handleClick('/')}>/</a>
            </div>
            <div>
              <a href="#" onClick={() => handleClick('7')}>7</a>
              <a href="#" onClick={() => handleClick('8')}>8</a>
              <a href="#" onClick={() => handleClick('9')}>9</a>
              <a href="#" className="dark" onClick={() => handleClick('*')}>×</a>
            </div>
            <div>
              <a href="#" onClick={() => handleClick('4')}>4</a>
              <a href="#" onClick={() => handleClick('5')}>5</a>
              <a href="#" onClick={() => handleClick('6')}>6</a>
              <a href="#" className="dark" onClick={() => handleClick('-')}>-</a>
            </div>
            <div>
              <a href="#" onClick={() => handleClick('1')}>1</a>
              <a href="#" onClick={() => handleClick('2')}>2</a>
              <a href="#" onClick={() => handleClick('3')}>3</a>
              <a href="#" className="dark" onClick={() => handleClick('+')}>+</a>
            </div>
            <div>
              <a href="#" className="big" onClick={() => handleClick('0')}>0</a>
              <a href="#" onClick={() => handleClick('.')}>.</a>
              <a href="#" className="dark" onClick={() => handleClick('=')}>=</a>
            </div>
          </div>
        </div>
        <p>Made by <a href='https://github.com/nottmayank/'>Mayank</a> with 💝 | <a href='https://github.com/nottmayank/calculator'>Repo</a></p>
      </div>
    </main>
  );
}
