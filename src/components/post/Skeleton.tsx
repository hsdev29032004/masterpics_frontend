"use client";
import { Box, Skeleton, Grid } from "@mui/material";

export default function PostSkeleton() {
    return (
        <Box
            sx={{
                borderRadius: "10px",
                padding: "10px",
            }}
        >
            <Grid container spacing={1} alignItems="center" mb={2}>
                <Grid item>
                    <Skeleton variant="circular" width={40} height={40} />
                </Grid>
                <Grid item xs>
                    <Skeleton variant="text" width="80px" height={20} />
                    <Skeleton variant="text" width="120px" height={20} />
                </Grid>
            </Grid>

            <Skeleton
                variant="rectangular"
                width="100%"
                height={200}
                sx={{ borderRadius: "10px" }}
            />
        </Box>
    );
}
