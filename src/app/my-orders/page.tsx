import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Order, OrderStatus } from "@nextjs-bff/models";
import Link from "next/link";


const orders: Order[] = [
    {
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
    }
];

export async function MyOrdersListPage() {
    return (
        <Box>
            <Typography variant="h4">My Orders</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Value</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map(order => {
                        return (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{new Date(order.created_at).toLocaleDateString('pt-BR')}</TableCell>
                                <TableCell>
                                    {new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                    }).format(order.total)}
                                </TableCell>
                                <TableCell>
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
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        component={Link}
                                        href={`/my-orders/${order.id}`}
                                    >
                                        Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Box>
    );
}

export default MyOrdersListPage;
