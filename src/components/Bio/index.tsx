import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Bio = () => {

  const openGithub = () => {
    window.open('https://github.com/or-bd/redis-cluster-demo', '_blank');
  };

  const openLinkdin = () => {
    window.open('https://www.linkedin.com/in/or-ben-dahan-81a74ba5', '_blank');
  };

  return (
    <Box position='absolute' right='5px' top='5px' display='flex' gap={1}>
      <Button size='small' startIcon={<GitHubIcon />} color='github' onClick={openGithub}>Github</Button>
      <Divider orientation="vertical" flexItem />
      <Button size='small' startIcon={<LinkedInIcon />} color='linkdin' onClick={openLinkdin}>Linkdin</Button>
    </Box>
  );
};

export default Bio;
