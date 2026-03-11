import { useState, useEffect } from 'react';

export function useTypewriter(words, speed = 80, pause = 1800) {
  const [text, setText] = useState('');
  const [wIdx, setWIdx] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[wIdx % words.length];
    if (!word) return;
    const t = setTimeout(() => {
      if (!del) {
        setText(word.slice(0, text.length + 1));
        if (text.length + 1 === word.length) setTimeout(() => setDel(true), pause);
      } else {
        setText(word.slice(0, text.length - 1));
        if (text.length === 0) {
          setDel(false);
          setWIdx((i) => i + 1);
        }
      }
    }, del ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [text, del, wIdx, words, speed, pause]);

  return text;
}
