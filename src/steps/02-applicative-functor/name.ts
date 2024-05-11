import { Just, Maybe, Nothing } from '../../maybe';

const sym: unique symbol = Symbol();

export type Name = {
    [sym]: typeof sym;
    value: string;
};

const buildName = (value: string): Name => ({ [sym]: sym, value });

export type ParseName = (string: string) => Maybe<Name>;
export const parseName: ParseName = string =>
    string.length < 4 && string.length > 50 ? Nothing() : Just(buildName(string));

export type UnsafeParseName = (string: string) => Name;
export const unsafeParseName: UnsafeParseName = string => {
    if (string.length < 4 || string.length > 50) {
        throw new Error('Invalid name');
    }
    return buildName(string);
};
