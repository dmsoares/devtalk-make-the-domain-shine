export interface WorkflowError {
    readonly tag: 'DomainError' | 'DeserializationError' | 'ValidationError' | 'UnknownError';
    readonly message: string;
    readonly error?: Error;
}

export const DomainError = (message: string, error?: Error): WorkflowError => ({
    tag: 'DomainError',
    message,
    error
});

export const DeserializationError = (message: string): WorkflowError => ({
    tag: 'DeserializationError',
    message
});

export const ValidationError = (message: string): WorkflowError => ({
    tag: 'ValidationError',
    message
});

export const UnknownError = (error: Error): WorkflowError => ({
    tag: 'UnknownError',
    message: error.message,
    error
});
