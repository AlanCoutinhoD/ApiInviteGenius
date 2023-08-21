export interface Event {
    id_user: string,
    nameEvent: string,
    imageRoute: string,
    category: string,
    adress: string,
    type: string,
    numParticipants:Number,
    date: Date,
    price: number,
    emails: string | undefined
}