import React, { useState, useEffect } from "react";
import { Box, Button, Container, Flex, FormControl, FormLabel, Input, Textarea, Heading, Text, VStack, HStack, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, useToast, Stat, StatLabel, StatNumber, StatGroup } from "@chakra-ui/react";
import { FaPlay, FaSave, FaStar } from "react-icons/fa";
import { client } from "lib/crud";

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [apiEndpoint, setApiEndpoint] = useState("");
  const [response, setResponse] = useState("");
  const [rating, setRating] = useState(1);
  const [statistics, setStatistics] = useState({ averageRating: 0, totalResponses: 0 });
  const toast = useToast();

  useEffect(() => {
    fetchStatistics();
  }, []);

  const handleSavePrompt = async () => {
    const success = await client.set(`prompt:${new Date().toISOString()}`, { prompt, apiEndpoint });
    if (success) {
      toast({
        title: "Prompt saved",
        description: "Your prompt has been successfully saved.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleExecutePrompt = async () => {
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
      toast({
        title: "Execution error",
        description: "There was an error executing the prompt.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleRateResponse = async () => {
    const success = await client.set(`response:${new Date().toISOString()}`, { response, rating });
    if (success) {
      toast({
        title: "Response rated",
        description: "Your rating has been recorded.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      fetchStatistics();
    }
  };

  const fetchStatistics = async () => {
    const responses = await client.getWithPrefix("response:");
    if (responses) {
      const totalResponses = responses.length;
      const averageRating = responses.reduce((acc, curr) => acc + curr.value.rating, 0) / totalResponses;
      setStatistics({ averageRating, totalResponses });
    }
  };

  return (
    <Container maxW="container.md" py={5}>
      <VStack spacing={5}>
        <Heading>Red-Team Large Language Models</Heading>
        <FormControl>
          <FormLabel>API Endpoint</FormLabel>
          <Input value={apiEndpoint} onChange={(e) => setApiEndpoint(e.target.value)} placeholder="Enter API endpoint" />
        </FormControl>
        <FormControl>
          <FormLabel>Prompt</FormLabel>
          <Textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Enter your prompt" />
        </FormControl>
        <HStack>
          <Button leftIcon={<FaSave />} colorScheme="blue" onClick={handleSavePrompt}>
            Save Prompt
          </Button>
          <Button leftIcon={<FaPlay />} colorScheme="teal" onClick={handleExecutePrompt}>
            Execute
          </Button>
        </HStack>
        <Box p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md">
          <Heading fontSize="xl">Response</Heading>
          <Text mt={4}>{response}</Text>
        </Box>
        <HStack>
          <FormControl>
            <FormLabel>Rate Response</FormLabel>
            <NumberInput max={5} min={1} value={rating} onChange={(valueString) => setRating(parseInt(valueString))}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <Button leftIcon={<FaStar />} colorScheme="yellow" onClick={handleRateResponse}>
            Rate
          </Button>
        </HStack>
        <StatGroup>
          <Stat>
            <StatLabel>Total Responses</StatLabel>
            <StatNumber>{statistics.totalResponses}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Average Rating</StatLabel>
            <StatNumber>{statistics.averageRating.toFixed(1)}</StatNumber>
          </Stat>
        </StatGroup>
      </VStack>
    </Container>
  );
};

export default Index;
