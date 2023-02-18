export class ContactDetails {
    constructor(
        public name: string,
        public surname: string,
        public phoneNumer: number,
        public location: string,
        public street: string,
        public buildingNumer: number,

        public email?: string,
        public flatNumer?: number,
    ) { }
}