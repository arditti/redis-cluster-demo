import { useSyncExternalStore } from 'react';
import NewKeyForm from "../NewKeyForm";
import Shards from "../Shards";
import Container from "@mui/material/Container";
import { getChangesCount, listenClusterEvents } from '../../redis/events';
import Intro from "../Intro";

const View = () => {
  useSyncExternalStore(listenClusterEvents, getChangesCount);

  return (
    <Container>
      <Intro />
      <NewKeyForm/>
      <Shards/>
    </Container>
  );
}

export default View;
