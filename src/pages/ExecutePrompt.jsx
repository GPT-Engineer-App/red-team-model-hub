import React, { useState } from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";

function ExecutePrompt() {
  const [response, setResponse] = useState("");

  const handleExecutePrompt = async () => {
    const apiEndpoint = "your-api-endpoint";
    const prompt = "your-prompt";
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setResponse(data.result);
    } catch (error) {
      alert("There was an error executing the prompt.");
    }
  };

  return (
    <Box p={4}>
      <Button leftIcon={<FaPlay />} colorScheme="teal" onClick={handleExecutePrompt}>
        Execute
      </Button>
      <Text mt={4}>{response}</Text>
    </Box>
  );
}

export default ExecutePrompt;
