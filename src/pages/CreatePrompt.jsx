import React, { useState } from "react";
import { Box, Text, FormControl, FormLabel, Input, Textarea, Button } from "@chakra-ui/react";
import { FaSave } from "react-icons/fa";
import { client } from "lib/crud";

function CreatePrompt() {
  const [prompt, setPrompt] = useState("");
  const [apiEndpoint, setApiEndpoint] = useState("");

  const handleSavePrompt = async () => {
    const success = await client.set(`prompt:${new Date().toISOString()}`, { prompt, apiEndpoint });
    if (success) {
      alert("Your prompt has been successfully saved.");
    }
  };

  return (
    <Box p={4}>
      <FormControl>
        <FormLabel>API Endpoint</FormLabel>
        <Input value={apiEndpoint} onChange={(e) => setApiEndpoint(e.target.value)} placeholder="Enter API endpoint" />
      </FormControl>
      <FormControl>
        <FormLabel>Prompt</FormLabel>
        <Textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Enter your prompt" />
      </FormControl>
      <Button leftIcon={<FaSave />} colorScheme="blue" onClick={handleSavePrompt}>
        Save Prompt
      </Button>
    </Box>
  );
}

export default CreatePrompt;
