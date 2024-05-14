import { useState, FormEvent } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import Cluster from '../../redis';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import { getExplanationText } from './explanation.ts';
import { HASHTAG_TEXT } from './consts.ts';

const NewKeyForm = () => {
  const [explain, setExplain] = useState<string>('');

  const handleNewKey = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const keyElement = event.currentTarget.elements.namedItem('key') as HTMLInputElement;
    if(!keyElement) return;

    const key = keyElement.value;
    Cluster.addKey(key);
    const explanationText = getExplanationText(key);
    if(!explanationText) return;

    setExplain(explanationText);
  };

  const removeExplain = () => {
    setExplain('');
  };

  return (
    <Box>
      <Divider textAlign='left'>
        <Typography color='primary'>Store New Key</Typography>
      </Divider>
      <Box display='flex' my={4} justifyContent='space-between' alignItems='center' flexWrap='wrap'>
        <Box display='flex' alignItems='center' component='form' gap={2} onSubmit={handleNewKey}>
          <Box>
            <TextField name="key" label="Key" variant="outlined" onChange={removeExplain} />
            <FormHelperText>You can also use {HASHTAG_TEXT} for custom hashing</FormHelperText>
          </Box>
          <Button type='submit' variant='outlined' style={{ height: 'fit-content' }}>Store</Button>
        </Box>
        {explain ? <Alert variant='outlined' onClose={removeExplain} severity='success'>{explain}</Alert> : null}
      </Box>
    </Box>
  );
};

export default NewKeyForm;
