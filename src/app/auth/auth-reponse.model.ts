export class AuthResponse {
    constructor(public idToken: string = null,
                public email: string = null,
                public refreshToken: string = null,
                public expiresIn: string = null,
                public localId: string = null){

    }
}

export class AuthLoginResponse extends AuthResponse{
    constructor(public registered: boolean = null) {
        super();
    }
}
