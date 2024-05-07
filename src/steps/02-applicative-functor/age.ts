import { Just, Maybe, Nothing } from '../../maybe';

export class Age {
    constructor(readonly value: string) {}
}

export const parseAge = (string: string): Maybe<Age> => {
    try {
        const value = parseInt(string, 10);
        return isNaN(value) ? Nothing() : Just(new Age(value.toString()));
    } catch {
        return Nothing();
    }
};
