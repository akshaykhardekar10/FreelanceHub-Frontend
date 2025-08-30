import React, { useState } from "react";
import { VStack, Box, Container, Input, InputGroup, Button, Text, Flex } from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";
import { motion } from "framer-motion";

const UsersForJob = () => {
  const [jobId, setJobId] = useState("");
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState([]);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      setError("");
      const url = `http://localhost:8080/api/matching/users-for-job/${jobId}?limit=${limit}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `Request failed with ${res.status}`);
      }
      const data = await res.json();
      setResults(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message || "Failed to fetch matches");
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack
      backgroundColor={"transparent"}
      my={5}
      borderRadius={15}
      py={5}
      minH={"100vh"}
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      spacing={6}
    >
      <Container w={"4/5"}>
        <VStack spacing={4}>
          <Box w={"full"}>
            <InputGroup
              flex="1"
              startElement={<LuSearch />}
              color={"white"}
              backgroundColor={"transparent"}
              w={"full"}
              borderRadius={"full"}
              boxShadow="0 0 10px rgba(0, 0, 255, 0.5)"
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.0, delay: 0.2 }}
            >
              <Input
                placeholder="Enter Job ID..."
                _placeholder={{ color: "whiteAlpha.700" }}
                h={"7vh"}
                value={jobId}
                onChange={(e) => setJobId(e.target.value)}
                borderStyle={"none"}
                border={"1px solid"}
                borderColor={"blue.200"}
                borderRadius={"full"}
                outlineColor={"blue.400"}
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "0 0 8px 2px rgba(99, 179, 237, 0.6)",
                }}
              />
            </InputGroup>
          </Box>

          <Flex w="full" gap={4} alignItems="center">
            <Input
              type="number"
              min={1}
              max={50}
              w="150px"
              color="white"
              backgroundColor="transparent"
              border="1px solid"
              borderColor="blue.200"
              borderRadius="md"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              _focus={{ borderColor: "blue.500", boxShadow: "0 0 8px rgba(99,179,237,0.6)" }}
              placeholder="Limit"
            />
            <Button
              onClick={fetchMatches}
              isDisabled={!jobId || loading}
              variant={"outline"}
              size="sm"
              colorScheme="blue"
              borderColor="blue.500"
              backgroundColor={"blue.600"}
              _hover={{ bg: "blue.400", color: "#0A0E1A", borderColor: "blue.400", boxShadow: "0 0 8px rgba(0, 0, 255, 0.5)" }}
            >
              {loading ? "Loading..." : "Find Users For Job"}
            </Button>
          </Flex>

          {error && (
            <Text color="red.300" fontSize="sm">{error}</Text>
          )}
        </VStack>

        <Box my={6} borderBottomWidth="1px" borderColor="blue.300" />

        <VStack alignItems="stretch" spacing={4}>
          {results.length === 0 && !loading && (
            <Text color="whiteAlpha.800">No matches yet. Enter a job ID and click Find.</Text>
          )}
          {results.map((user, idx) => (
            <Box
              key={idx}
              background="linear-gradient(135deg, #1F2C3C, #324A5E)"
              shadow="lg"
              borderRadius={10}
              p={5}
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.03 }}
            >
              <VStack alignItems="flex-start" spacing={2}>
                <Flex color="whiteAlpha.900" gap={2} alignItems="baseline" wrap="wrap">
                  <Text fontWeight="bold">User:</Text>
                  <Text>{user.username || user.email || user.id}</Text>
                </Flex>
                <Flex color="whiteAlpha.900" gap={2} alignItems="baseline">
                  <Text fontWeight="bold">Similarity Score:</Text>
                  <Text>{typeof user.similarityScore === "number" ? user.similarityScore.toFixed(4) : user.similarityScore}</Text>
                </Flex>
                {user.skills && user.skills.length > 0 && (
                  <Flex color="whiteAlpha.900" gap={2} alignItems="baseline" wrap="wrap">
                    <Text fontWeight="bold">Skills:</Text>
                    <Text>{user.skills.join(", ")}</Text>
                  </Flex>
                )}
              </VStack>
            </Box>
          ))}
        </VStack>
      </Container>
    </VStack>
  );
};

export default UsersForJob;
