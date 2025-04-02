export class Currency {
    constructor(
        public code: string,
        public symbol: string,
        public rate: string,
        public description: string,
        public rate_float: number
    ){}
}
