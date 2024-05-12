export interface ApplicationError {
    readonly tag:
        | 'PersistenceError'
        | 'DomainError'
        | 'DeserializationError'
        | 'ValidationError'
        | 'UnknownError';
    readonly message: string;
    readonly error?: Error;
}

export const PersistenceError = (message: string, error?: Error): ApplicationError => ({
    tag: 'PersistenceError',
    message,
    error
});

export const DomainError = (message: string, error?: Error): ApplicationError => ({
    tag: 'DomainError',
    message,
    error
});

export const DeserializationError = (message: string): ApplicationError => ({
    tag: 'DeserializationError',
    message
});

export const ValidationError = (message: string): ApplicationError => ({
    tag: 'ValidationError',
    message
});

export const UnknownError = (error: Error): ApplicationError => ({
    tag: 'UnknownError',
    message: error.message,
    error
});
