import { useState } from 'react';

const useCount = () => {
    const [count, setCount] = useState(0);

    const sum = () => {
        setCount(count + 1);
    };

    const resta = () => {
        setCount(count - 1);
    };

    return { count, sum, resta };
};

export default useCount;
