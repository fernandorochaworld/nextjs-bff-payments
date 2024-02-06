import { Delete, ShoppingCart } from "@mui/icons-material";
import { Avatar, Box, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Total } from "@nextjs-bff/components/Total";
import { CartServiceFactory } from "@nextjs-bff/services/cart.service";
import { ProductService } from "@nextjs-bff/services/product.service";
import { removeItemFromCartAction } from "@nextjs-bff/sever-actions/cart.actions";
import Link from "next/link";
import React from "react";


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

// const cart = {
//     items: [
//         {
//             product_id: '1',
//             quantity: 2,
//             total: 200,
//         },
//         {
//             product_id: '2',
//             quantity: 1,
//             total: 100,
//         },
//     ],
//     total: 1000,
// };


async function MyCartPage() {
    const cart = CartServiceFactory.create().getCart();
    const productService = new ProductService();
    const products = await productService.getProductsByIds(
        cart.items.map(item => item.product_id)
    )
    return (
        <Box>
            <Typography variant="h3">
                <ShoppingCart /> My Cart
            </Typography>
            <Grid2 container>
                <Grid2 xs={10} sm={7} md={4}>
                    <List>
                        {cart.items.map((item, key) => {
                            const product = products.find(
                                product => product.id == item.product_id
                            )!;

                            return (
                                <React.Fragment key={key}>
                                    <ListItem
                                        sx={{ display: 'flex', alignItems: 'flex-start', mt: 3 }}
                                    >
                                        <ListItemAvatar>
                                            <Avatar src={product.image_url} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                    }}
                                                >
                                                    <Typography variant="button">
                                                        {product.name} - Qtd. {item.quantity}
                                                    </Typography>
                                                    <Typography sx={{ color: 'primary.main' }}>
                                                        {new Intl.NumberFormat('pt-BR', {
                                                            style: 'currency',
                                                            currency: 'BRL',
                                                        }).format(item.total)}
                                                    </Typography>
                                                </Box>
                                            }
                                        />
                                    </ListItem>
                                    <ListItem
                                        sx={{ display: 'flex', justifyContent: 'end', p: 0 }}
                                    >
                                        <form action={removeItemFromCartAction}>
                                            <input type="hidden" name="index" value={key} />
                                            <Button
                                                color="error"
                                                startIcon={<Delete />}
                                                type="submit"
                                            >
                                                Remove
                                            </Button>
                                        </form>
                                    </ListItem>
                                    <Divider variant="inset" component="li" sx={{ ml: 0 }} />
                                </React.Fragment>
                            );
                        })}
                        {!cart.items.length && (
                            <ListItem>
                                <ListItemText>No item in the cart</ListItemText>
                            </ListItem>
                        )}
                    </List>
                    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                        <Total total={cart.total} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
                        {cart.items.length ? (
                            <Button LinkComponent={Link} href="/checkout">
                                Finish purchase
                            </Button>
                        ) : (
                            <Button LinkComponent={Link} href="/products">
                                Continue Shopping
                            </Button>
                        )}
                    </Box>
                </Grid2>
            </Grid2>
        </Box>
    );
}

export default MyCartPage;
