import React from 'react';
import { Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <Box bg="blue.500" p={4} color="white">
      <Link to="/">Home</Link> | 
      <Link to="/create-prompt">Create Prompt</Link> | 
      <Link to="/execute-prompt">Execute Prompt</Link> | 
      <Link to="/rate-response">Rate Response</Link> | 
      <Link to="/dashboard">Dashboard</Link>
    </Box>
  );
}

export default NavBar;