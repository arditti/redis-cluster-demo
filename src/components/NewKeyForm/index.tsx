import { useState, FormEvent } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import Cluster from '../../redis';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { CLUSTER_MAX_SLOT } from "../../redis/const.ts";
import * as encrypt from "../../redis/encrypt.ts";
import Alert from "@mui/material/Alert";

const NewKeyForm = () => {
  const [explain, setExplain] = useState<string>('');

  const handleNewKey = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const keyElement = event.currentTarget.elements.namedItem('key') as HTMLInputElement;
    if(!keyElement) return;

    const key = keyElement.value;
    Cluster.addKey(key);
    const keyHash = encrypt.hashKey(key);
    if(!keyHash) return;

    setExplain(`The '${key}' CRC16 hash is ${keyHash} mod ${CLUSTER_MAX_SLOT} = slot ${keyHash % CLUSTER_MAX_SLOT}`);
  }

  const removeExplain = () => {
    setExplain('');
  }

  return (
    <Box>
      <Divider textAlign="left">
        <Typography color="primary">Store New Key</Typography>
      </Divider>
      <Box display="flex" my={4} justifyContent="space-between" alignItems="center" flexWrap="wrap">
        <Box display="flex" component='form' gap={4} onSubmit={handleNewKey}>
          <Box>
            <InputLabel>Key</InputLabel>
            <Input name="key" onChange={removeExplain} />
            <FormHelperText>You can also use {"{hashtag}"} for custom hashing</FormHelperText>
          </Box>
          <Button type="submit" variant="outlined">Store</Button>
        </Box>
        {explain ? <Alert variant="outlined" onClose={removeExplain} severity="success">{explain}</Alert> : null}
      </Box>
    </Box>
  );
};

export default NewKeyForm;
