export type Review = {
    _id: string;
    serviceType: string;
    userId: string;
    userName: string;
    reviewedId: string;
    rating: number;
    reviewText: string;
    date: string;
}