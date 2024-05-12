import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { BounceBox } from '../../style/aminations';
import * as types from '../../redis/types';

const Key = ({ name, data }: { name: string, data: types.Key }) => {
  return (
    <BounceBox display="flex" alignItems="center" marginBottom={1}>
      <Chip size="small" label={data.hash} style={{ marginRight: '5px' }} />
      <Typography whiteSpace="nowrap" variant="body2">{name}</Typography>
    </BounceBox>
  );
};

const Shard = (shard: types.Shard) => {
  const keysEntries = Object.entries(shard.keys);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mb={5}>
      <Box
        m={1}
        p={1}
        width={250}
        height={300}
        minWidth={0}
        overflow="auto"
        borderRadius={2}
        border='1px solid'
        component='fieldset'
      >
        <legend>{shard.id} keys</legend>
        {!keysEntries.length ? <Typography align='center'>No keys yet..</Typography> : null}
        {keysEntries.map(([key, metadata]) => (
          <Key key={key} name={key} data={metadata} />
        ))}
      </Box>
      <Box display="flex" alignItems="center">
        <Typography>From slot</Typography>
        <Chip size="small" label={shard.slot.min} style={{ margin: '0 5px' }} />
        <Typography>to</Typography>
        <Chip size="small" label={shard.slot.max} style={{ marginLeft: '5px' }} />
      </Box>
    </Box>
  );
};

export default Shard;
