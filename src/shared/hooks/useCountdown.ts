import { useCallback, useEffect, useRef, useState } from "react"

type CountdownState = 'initial' | 'inProgress' | 'done' | 'cancelled';

export function useCountdown(stepMS: number = 1000) {
    const [count, _setCount] = useState<number>(0);
    const [state, _setState] = useState<CountdownState>('initial');

    const _timer = useRef<NodeJS.Timeout | undefined>(undefined);

    const _tick = () => _setCount(prev => prev - 1);

    const _stopTimer = useCallback(() => {
        clearInterval(_timer.current);
    }, [_timer]);

    const start = (countFrom: number) => {
        _stopTimer();

        _setState('inProgress');
        _setCount(countFrom);

        _timer.current = setInterval(_tick, stepMS);
    }

    const reset = () => {
        _stopTimer();

        _setState('initial');
    }

    const stop = useCallback(() => {
        _stopTimer();

        _setState('cancelled');
    }, [_stopTimer, _setState]);

    useEffect(() => {
        if (state === 'cancelled') return;
        if (state === 'initial') return;

        if (count === 0) {
            _stopTimer();

            _setState('done');
        }
    }, [count, _setState, state, _stopTimer]);

    useEffect(() => () => stop(), [stop]);

    return {
        count,
        state,
        start,
        stop,
        reset,
    };
}