import { useRef } from 'react';

export const useDebounce = <A, R>(
    fn: (args: A) => R,
    ms: number,
) => {
    const ref = useRef<NodeJS.Timeout | undefined>(undefined);

    const teardown = () => clearTimeout(ref.current);

    const debounced = (args: A) => {
        teardown();
        ref.current = setTimeout(() => fn(args), ms);
    }

    return {
        fn: debounced,
        cancel: teardown
    };
};