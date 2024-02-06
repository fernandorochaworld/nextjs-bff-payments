"use client";

import { Paid } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { checkoutAction } from "@nextjs-bff/sever-actions/checkout.action";

export function CheckoutForm() {
    return (
        <Box component={'form'} action={async (formData: FormData) => {
            // logic to generate card hash
            formData.set('card_hash', '123');
            await checkoutAction(formData);
        }}>
            <input type="hidden" name="card_hash" value="123" />
            <Grid2 container spacing={3}>
                <Grid2 xs={12} md={6}>
                    <TextField
                        name="cc-name"
                        required
                        label="Name in the Card"
                        fullWidth
                        autoComplete="cc-name"
                        variant="standard"
                        defaultValue={"John Smith"}
                    />
                </Grid2>
                <Grid2 xs={12} md={6}>
                    <TextField
                        name="cc-number"
                        required
                        label="Card number"
                        fullWidth
                        autoComplete="cc-number"
                        variant="standard"
                        defaultValue={"411111111111111111"}
                    />
                </Grid2>
                <Grid2 xs={12} md={6}>
                    <TextField
                        name="cc-exp"
                        required
                        label="Exp date MM/YYYY"
                        fullWidth
                        autoComplete="cc-exp"
                        variant="standard"
                        defaultValue={"12/2022"}
                    />
                </Grid2>
                <Grid2 xs={12} md={6}>
                    <TextField
                        name="cc-csc"
                        required
                        label="CVV"
                        fullWidth
                        autoComplete="cc-csc"
                        variant="standard"
                        defaultValue={"123"}
                    />
                </Grid2>
            </Grid2>
            <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
                <Button type="submit" sx={{mt:3}} startIcon={<Paid />}>
                    Pay
                </Button>
            </Box>
        </Box>
    )
}
