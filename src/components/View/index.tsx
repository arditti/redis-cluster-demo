import { useSyncExternalStore } from 'react';
import Bio from '../Bio';
import Intro from '../Intro';
import Shards from '../Shards';
import NewKeyForm from '../NewKeyForm';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { getChangesCount, listenClusterEvents } from '../../redis/events';

const View = () => {
  useSyncExternalStore(listenClusterEvents, getChangesCount);

  return (
    <Container style={{ position: 'relative', overflow: 'hidden' }}>
      <Bio />
      <Typography align="center" variant="h4" my={4}>Redis Cluster data sharding</Typography>
      <Intro />
      <NewKeyForm/>
      <Shards/>
    </Container>
  );
};

export default View;
