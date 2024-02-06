import { Product } from "@nextjs-bff/models";

export class ProductService {

    async getProduct(productId: string): Promise<Product> {
        const response = await fetch(`${process.env.CATALOG_API_URL}/product/${productId}`, {
            next: {
                revalidate: 30
            }
        }); // revalidate on demand
        return response.json();
    };

    async getProducts({ search, category_id }: { search: string | undefined, category_id: string | undefined }): Promise<Product[]> {

        let url = `${process.env.CATALOG_API_URL}/product`

        if (category_id) {
            url += `/category/${category_id}`;
        }

        const response = await fetch(url, {
            next: {
                revalidate: 30
            }
        });

        let data = await response.json();
        data = !data ? [] : data;

        if (search) {
            return data.filter((product: Product) => {
                return product.name.toLowerCase().includes(search.toLowerCase())
            })
        }

        // return response.json();
        return data;
    }


    async getProductsByIds(productIds: string[]): Promise<Product[]> {
        // const response = await fetch(
        //     `${process.env.CATALOG_API_URL}/product/${productIds.join(',')}`,
        //     {
        //         next: {
        //             revalidate: 60
        //         }
        //     }
        // );
        // return response.json();

        const responses = await Promise.all(
            productIds.map(productId => 
                fetch(`${process.env.CATALOG_API_URL}/product/${productId}`, {
                    next: {
                        revalidate: 60
                    }
                })
            )
        );

        return Promise.all(responses.map(response => response.json()));
    }
}