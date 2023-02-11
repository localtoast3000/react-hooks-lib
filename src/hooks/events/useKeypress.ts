import { useState, useEffect } from 'react';

export default function useKeypress() {
  const [key, setKey] = useState(null);

  const keypressHandler = (e: KeyboardEvent) => {};

  useEffect(() => {}, []);
}
