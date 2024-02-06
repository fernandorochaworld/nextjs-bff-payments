'use server';

import { CartService, CartServiceFactory } from "@nextjs-bff/services/cart.service";
import { ProductService } from "@nextjs-bff/services/product.service";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export type CartItem = {
    product_id: string;
    quantity: number;
    total: number;
}

export type Cart = {
    items: CartItem[];
    total: number;
}

export async function addToCartAction(formdata: FormData) {
    const product_id = formdata.get('product_id') as string;
    const quantity = parseInt(formdata.get('quantity') as string);

    // const cookieStore = cookies();
    // const cartString = cookieStore.get('cart')?.value;

    // if (cartString) {
    //     cookieStore.set('cart', JSON.stringify({items: []}));
    // }

    // const cart: Cart = cartString ? JSON.parse(cartString) : {items: [], total: 0};

    // const product = await new ProductService().getProduct(product_id);

    // cart.items.push({
    //     product_id: product_id,
    //     quantity: parseInt(quantity),
    //     total: parseInt(quantity) * product.price
    // });

    // cart.total = cart.total + parseInt(quantity) * product.price;

    // cookieStore.set('cart', JSON.stringify(cart));

    const CartService = CartServiceFactory.create();
    await CartService.addToCart({ product_id, quantity});
    redirect('/my-cart');
}

export async function removeItemFromCartAction(formData: FormData) {
    const cartService = CartServiceFactory.create();
    const index = parseInt(formData.get('index') as string);
    cartService.removeItemFromCart(index);
}