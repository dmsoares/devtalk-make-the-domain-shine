import { Just, Maybe, Nothing } from '../../maybe';

export class Name {
    constructor(readonly value: string) {}
}

export const parseName = (string: string): Maybe<Name> =>
    string.length < 4 && string.length > 50 ? Nothing() : Just(new Name(string));
