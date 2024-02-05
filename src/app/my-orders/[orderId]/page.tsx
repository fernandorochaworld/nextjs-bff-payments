import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Total } from "@nextjs-bff/components/Total";
import { Order, OrderStatus } from "@nextjs-bff/models";


const order: Order = {
    id: '1',
    status: OrderStatus.PENDING,
    created_at: '2021-10-10T00:00:00.000Z',
    items: [
        {
            id: 1,
            quantity: 2,
            price: 100,
            product: {
                id: '1',
                name: 'Product 1',
                description: 'Description product 1',
                price: 100,
                image_url: 'https://cdn.ttgtmedia.com/rms/onlineimages/hp_elitebook.jpg',
                category_id: '1'
            },
        },
        {
            id: 2,
            quantity: 2,
            price: 100,
            product: {
                id: '2',
                name: 'Product 2',
                description: 'Description product 2',
                price: 100,
                image_url: 'https://cdn.ttgtmedia.com/rms/onlineimages/hp_elitebook.jpg',
                category_id: '1'
            },
        },
    ],
    total: 1000,
};

async function MyOrderDetail({params}: { params: { orderId: string } }) {
    return (
        <Box>
            <Grid2 container spacing={2}>
                <Grid2 xs={12} md={6}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                        {order.status === OrderStatus.PENDING ? (
                            <Typography variant="h5" sx={{color: 'warning.main'}}>
                                ⌛
                            </Typography>
                        ) : order.status === OrderStatus.PAID ? (
                            <Typography variant="h5" sx={{color: 'success.main'}}>
                                ✅
                            </Typography>
                        ) : (
                            <Typography variant="h5" sx={{color: 'error.main'}}>
                                ✖️
                            </Typography>
                        )}
                        </Box>
                        <Typography variant="h4" sx={{textAlign: 'center'}}>
                            {order.status === OrderStatus.PENDING 
                                ? "Order Pending"
                                : order.status === OrderStatus.PAID
                                ? "Order Payed"
                                : "Canceled Order"}
                        </Typography>
                    </Box>
                </Grid2>
                
                <Grid2 xs={12} md={6}>
                    <Typography variant="h4">Purchase details</Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Product</TableCell>
                                <TableCell>Qtd.</TableCell>
                                <TableCell>Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {order.items.map((item, key) => {
                                return (
                                    <TableRow key={key}>
                                        <TableCell>{item.product.name}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>
                                            {new Intl.NumberFormat('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL',
                                            }).format(item.price * item.quantity)}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <Box sx={{display:'flex', justifyContent: 'end'}}>
                                        <Total total={order.total} />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default MyOrderDetail;