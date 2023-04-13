export interface SignUpInputDTO {
    fullName: string,
    email: string,
    password: string,
    role: string
}

export interface LoginInputDTO {
    email: string,
    password: string
}