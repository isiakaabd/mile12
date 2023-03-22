import { Card, CardContent, Typography, Grid, Paper } from "@mui/material";

export default function BasicCard({ item: { headings, figure, Icon } }) {
  return (
    <Paper elevation={2}>
      <Card sx={{ width: "100%", p: 2 }}>
        <CardContent>
          <Grid
            item
            container
            justifyContent={"center"}
            alignItems={"center"}
            flexWrap={"nowrap"}
          >
            <Grid item container flexDirection={"column"}>
              <Typography
                sx={{ color: "#C0C0C0", fontWeight: 400 }}
                variant="h5"
                gutterBottom
              >
                {headings}
              </Typography>
              <Typography variant="h3" color="primary">
                {figure}
              </Typography>
            </Grid>
            <Grid item>
              <Icon style={{ fontSize: "4rem" }} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Paper>
  );
}
