import { Just, Maybe, Nothing } from '../../maybe';

const sym: unique symbol = Symbol();

export type Age = {
    [sym]: typeof sym;
    value: string;
};

const buildAge = (value: string): Age => ({ [sym]: sym, value });

export const parseAge = (string: string): Maybe<Age> => {
    try {
        const value = parseInt(string, 10);
        return isNaN(value) ? Nothing() : Just(buildAge(value.toString()));
    } catch {
        return Nothing();
    }
};
