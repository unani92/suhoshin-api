export enum UserStatus {
    NON_VERIFIED,
    VERIFIED,
    ADMIN
}

export interface createProps {
    title: string,
    content: string,
}

export interface Note {
    id: number,
    user: string,
    title: string,
    content: string,
}