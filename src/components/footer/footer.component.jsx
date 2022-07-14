import {
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  Box
} from '@mui/material';

const Footer = () => {
  return (
    <Box>
      <Divider />
      <Container>
        <Grid container justifyContent="space-between" alignItems="center" mb={2} mt={2}>
          <Grid item>
            <Typography>
              jul.pom@gmail.com
            </Typography>
            <Typography>
              © Copyright 2022, Master Fronty
            </Typography>
          </Grid>
          <Grid item>
            <Typography fontWeight="bold">
              <Link href="https://www.flaticon.com/" title="html icons" target="_blank">
                Icons created by Smashicons - Flaticon
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;