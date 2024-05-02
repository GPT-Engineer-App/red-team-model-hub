import React, { useState } from "react";
import { Box, Text, Button, FormControl, FormLabel, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { client } from "lib/crud";

function RateResponse() {
  const [rating, setRating] = useState(1);
  const [response, setResponse] = useState("Sample response to rate");

  const handleRateResponse = async () => {
    const success = await client.set(`response:${new Date().toISOString()}`, { response, rating });
    if (success) {
      alert("Your rating has been recorded.");
    }
  };

  return (
    <Box p={4}>
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
      <Text mt={4}>{response}</Text>
    </Box>
  );
}

export default RateResponse;
