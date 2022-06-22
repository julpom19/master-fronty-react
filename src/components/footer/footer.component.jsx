import { Container, Grid, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Container>
      <Grid container justifyContent="space-between">
        <Grid item>
          <Typography>
            jul.pom@gmail.com
          </Typography>
        </Grid>
        <Grid item>
          <Typography>
            Some info
          </Typography>
        </Grid>
      </Grid>
    </Container>

  );
};

export default Footer;