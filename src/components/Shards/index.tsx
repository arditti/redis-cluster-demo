import Shard from "../Shard";
import Box from "@mui/material/Box";
import Cluster from "../../redis";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ZoomOutIcon from '@mui/icons-material/ZoomOutMap';
import ZoomInIcon from '@mui/icons-material/ZoomInMap';

const Shards = () => {

  const scaleIn = () => {
    Cluster.removeShard();
  };

  const scaleOut = () => {
    Cluster.addShard();
  };

  return (
    <>
      <Box display="flex" alignItems="center">
        <Divider textAlign="left" style={{ flex: 1 }}>
          <Typography color="primary">Shards</Typography>
        </Divider>
        <Box display="flex">
          <Button variant="outlined" style={{ margin: '0 10px' }} onClick={scaleOut} startIcon={<ZoomOutIcon />}>
            Scale Out
          </Button>
          <Button variant="outlined" onClick={scaleIn} startIcon={<ZoomInIcon />}>
            Scale In
          </Button>
        </Box>
      </Box>
      <Box display="flex" flexWrap="wrap" justifyContent="center">
        {Object.entries(Cluster.shards).map(([name, shard]) => (
          <Box display="flex" justifyContent="center" alignItems="center" key={name}>
            <Shard {...shard} />
          </Box>
        ))}
      </Box>
    </>
  )
};

export default Shards;
