import Freelancers from '../../components/Freelancers/Freelancers';
import { Box, Input, InputGroup, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { LuSearch } from 'react-icons/lu';

const HireJob = () => {
  const [selectedDomain, setSelectedDomain] = useState('');
  const [freelancers, setFreelancers] = useState([]);
  const token = localStorage.getItem('token');
  const [isToken, setIsToken] = useState(token);

  useEffect(() => {
    if (!isToken) {
      console.error('No access token found');
      return;
    }

    // Fetch freelancers with the access token
    fetch('http://localhost:8080/api/users/getAllUsers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Use token in the Authorization header
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch freelancers');
        }
        return res.json();
      })
      .then((data) => {
        setFreelancers(data); // Update freelancers state with the fetched data
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  }, [token]); // Dependency array includes token, so the effect runs when the token changes

  return (
    <VStack
      backgroundColor={'transparent'}
      my={5}
      borderRadius={15}
      py={5}
      minH={'100vh'}
      w="full"
      color="white" // Set text color to white
    >
      <Box w={'1/2'}>
        {/* Search field */}
        <InputGroup
          flex="1"
          startElement={<LuSearch />}
          color={'white'}
          backgroundColor={'transparent'} // Keep background transparent
          w={'full'}
          borderRadius={'full'}
          boxShadow="0 0 10px rgba(0, 0, 255, 0.5)" // Ring-light effect
        >
          <Input
            placeholder="Search Domain..."
            _placeholder={{ color: 'whiteAlpha.700' }} // Placeholder text color white with opacity
            h={'7vh'}
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            borderStyle={'none'}
            border={'1px solid'}
            borderColor={'blue.200'}
            borderRadius={'full'}
            outlineColor={'blue.400'}
            color="white" // Ensure text color inside the input is white
          />
        </InputGroup>
      </Box>

      <Freelancers selectedDomain={selectedDomain} freelancers={freelancers} />
    </VStack>
  );
};

export default HireJob;
