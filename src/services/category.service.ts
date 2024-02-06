import { Category } from "@nextjs-bff/models";

export class CategoryService {

    async getCategorys(): Promise<Category[]> {
        const response = await fetch(`${process.env.CATALOG_API_URL}/category`, {
            next: {
                revalidate: 30
            }
        });

        return response.json();
    }
}