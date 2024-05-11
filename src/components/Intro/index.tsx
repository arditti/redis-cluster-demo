import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

const Intro = () => {
  return (
    <>
      <Divider textAlign="left">
        <Typography color="primary">Intro</Typography>
      </Divider>
      <Box my={3}>
        <Typography display="inline">A simple visual demonstration of how </Typography>
        <Link
          target="_blank"
          rel="noopener"
          href="https://redis.io/docs/latest/operate/oss_and_stack/management/scaling/#redis-cluster-data-sharding"
        >
          Redis Cluster data sharding
        </Link>
        <Typography display="inline"> Works, The demo isn't mean to behave like a full Redis engine but only a lean and
          simple key & slots & shards relationship without any server at the background.
        </Typography>
      </Box>
    </>
  )
};

export default Intro;
