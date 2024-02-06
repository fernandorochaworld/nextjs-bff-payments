import { Check } from "@mui/icons-material";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@mui/material"

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Total } from "@nextjs-bff/components/Total";
import { OrderServiceFactory } from "@nextjs-bff/services/order.service";

async function CheckoutSuccessPage({
    params,
}: {
    params: { orderId: string };
}) {
    const orderService = OrderServiceFactory.create();
    const order = await orderService.getOrder(params.orderId);
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
                            <Check sx={{ color: 'success.main', mr: 2, fontSize: 150 }} />
                        </Box>
                        <Typography variant="h4" sx={{textAlign: 'center'}}>
                            Order successfully registered!
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
    )
};

export default CheckoutSuccessPage;
