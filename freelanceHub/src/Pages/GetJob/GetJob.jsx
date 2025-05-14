import Job from "../../components/Jobs/Job";
import { VStack, Box, Container, Input, InputGroup } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { LuSearch } from "react-icons/lu";
import { motion } from "framer-motion"; // Import framer-motion for animations

const GetJob = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("");
  const token = localStorage.getItem('token');
  const [isToken, setIsToken] = useState(token);

  useEffect(() => {
    if (!isToken) {
      console.error("No access token found");
      return;
    }
    
    fetch("http://localhost:8080/api/jobs/getAllJobs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch jobs");
        return res.json();
      })
      .then((data) => {
        setJobs(data);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, [token]);

  return (
    <VStack
      backgroundColor={'transparent'}
      my={5}
      borderRadius={15}
      py={5}
      minH={'100vh'}
      as={motion.div} // Apply animation to the VStack
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
        
      <Box w={'1/2'}>
        {/* Search field */}
        <InputGroup
          flex="1"
          startElement={<LuSearch />}
          color={'white'}
          backgroundColor={'transparent'}
          w={'full'}
          borderRadius={'full'}
          boxShadow="0 0 10px rgba(0, 0, 255, 0.5)"
          as={motion.div} // Animate search field
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        >
          <Input
            placeholder="Search Domain..."
            _placeholder={{ color: "whiteAlpha.700" }}
            h={'7vh'}
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            borderStyle={'none'}
            border={'1px solid'}
            borderColor={'blue.200'}
            borderRadius={'full'}
            outlineColor={'blue.400'}
            _focus={{
              borderColor: "blue.500", // Blue border on focus
              boxShadow: "0 0 8px 2px rgba(99, 179, 237, 0.6)", // Ringlight effect
            }}
          />
        </InputGroup>
      </Box>

      {/* Jobs */}
      <Container w={'4/5'}>
        {selectedDomain
          ? jobs.map((e, key) => {
              if (JSON.stringify(e.jobDomain).toLowerCase().includes(selectedDomain.toLowerCase())) {
                return (
                  <motion.div
                    key={e.jobId}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <Job
                      title={e.title}
                      description={e.description}
                      price={e.price}
                      owner={e.postedByUsername}
                      date={e.date}
                      domain={e.jobDomain}
                      postedBy={JSON.stringify(e.postedById)}
                    />
                  </motion.div>
                );
              }
            })
          : jobs.map((e, key) => {
              return (
                <motion.div
                  key={e.jobId}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Job
                    title={e.title}
                    description={e.description}
                    price={e.price}
                    owner={e.postedByUsername}
                    date={e.date}
                    domain={e.jobDomain}
                    jobId={e.jobId}
                    postedBy={JSON.stringify(e.postedById)}
                  />
                </motion.div>
              );
            })
        }
      </Container>
    </VStack>
  );
};

export default GetJob;
