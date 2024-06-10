export interface IBasket {
    quantity: number,
    price: number,
    product: {
        id: number,
        name: string,
        price: number,
        nuts: boolean,
        image: string,
        vegeterian: boolean,
        spiciness: number,
        categoryId: number
    }
};