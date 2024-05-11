import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import * as types from "../../redis/types";

const Key = ({ name, data }: { name: string, data: types.Key }) => {
  return (
    <Box display="flex" alignItems="center" marginBottom={1}>
      <Chip size="small" label={data.hash} style={{ marginRight: '5px' }} />
      <Typography noWrap>{name}</Typography>
    </Box>
  )
}

const Shard = (shard: types.Shard) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" mb={5}>
      <Box component="fieldset" border='1px solid' borderRadius={2} width={250} height={300} m={1} p={1} overflow="auto">
        <legend>{shard.id} keys</legend>
        {Object.entries(shard.keys).map(([key, metadata]) => <Key key={key} name={key} data={metadata} />)}
      </Box>
      <Box display="flex" alignItems="center">
        <Typography>From slot</Typography>
        <Chip size="small" label={shard.slot.min} style={{ margin: '0 5px' }} />
        <Typography>to</Typography>
        <Chip size="small" label={shard.slot.max} style={{ marginLeft: '5px' }} />
      </Box>
    </Box>
  );
}

export default Shard;
