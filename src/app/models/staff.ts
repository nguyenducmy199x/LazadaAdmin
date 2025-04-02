export class Staff {
    constructor(
        public id: number,
        public username: string,
        public password: string,
        public role: number,
        public createdAt: Date,
        public lastLogin: Date,
        public softDelete: boolean
         
    ){}

}
