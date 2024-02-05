import { Box, Divider, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Total } from "@nextjs-bff/components/Total";
import { redirect } from "next/navigation";
import { CheckoutForm } from "./CheckoutForm";


const products = [
    {
        id: '1',
        name: 'Product 1',
        description: 'Description product 1',
        price: 100,
        image_url: 'https://cdn.ttgtmedia.com/rms/onlineimages/hp_elitebook.jpg',
        category_id: '1'
    },
    {
        id: '2',
        name: 'Product 1',
        description: 'Description product 1',
        price: 100,
        image_url: 'https://cdn.ttgtmedia.com/rms/onlineimages/hp_elitebook.jpg',
        category_id: '1'
    },
];

const cart = {
    items: [
        {
            product_id: '1',
            quantity: 2,
            total: 200,
        },
        {
            product_id: '2',
            quantity: 1,
            total: 100,
        },
    ],
    total: 1000,
};

async function CheckoutPage() {
    if (cart.items.length === 0) {
        return redirect('/my-cart');
    }

    return (
        <Box>
            <Typography variant="h3">Checkout</Typography>
            <Grid2 container spacing={3}>
                <Grid2 xs={12} md={6}>
                    <CheckoutForm />
                </Grid2>
                <Grid2 xs={0} md={1}>
                    <Divider orientation="vertical" />
                </Grid2>
                <Grid2 xs={12} md={5}>
                    <Typography variant="h5">Order details</Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Product</TableCell>
                                <TableCell>Qtd.</TableCell>
                                <TableCell>Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cart.items.map((item, key) => {
                                const product = products.find(
                                    (product) => product.id == item.product_id
                                )!;
                                return (
                                    <TableRow key={key}>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>
                                            {new Intl.NumberFormat('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL',
                                            }).format(item.total)}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <Total total={cart.total} />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid2>
            </Grid2>
        </Box>
    );
}


export default CheckoutPage;
