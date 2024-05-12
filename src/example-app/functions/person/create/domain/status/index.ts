const sym: unique symbol = Symbol();

type StatusType = 'active' | 'inactive';

export type Status = {
    [sym]: typeof sym;
    value: StatusType;
};

const buildStatus = (value: StatusType): Status => ({ [sym]: sym, value });

export const Active = () => buildStatus('active');
export const Inactive = () => buildStatus('inactive');
