import useShowToast from '../../Hooks/useShowToast';
import { Box, Button, Input, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostJobForm = () => {
  const [jobInputs, setJobInputs] = useState({
    title: '',
    description: '',
    price: '',
    jobDomain: '',
  });

  const navigate = useNavigate();
  const showToast = useShowToast();
  const token = localStorage.getItem('token');
  const [isToken, setIsToken] = useState(token);

  const postJob = async () => {
    if (
      !jobInputs.title &&
      !jobInputs.description &&
      !jobInputs.price &&
      !jobInputs.jobDomain
    ) {
      showToast('Error', 'Please fill all the fields.', 'error');
    } else {
      try {
        const res = await fetch('http://localhost:8080/api/jobs/postJob', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(jobInputs),
        });

        if (res.ok) {
          alert('Job Posted.');
          jobInputs.title = '';
          jobInputs.description = '';
          jobInputs.price = '';
          jobInputs.jobDomain = '';
          navigate('/post-job');
        } else {
          const errorText = await res.text();
          alert(errorText || 'Job Posting failed!');
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }
  };

  return (
    <>
      <VStack
        w="2/5"
        mt={5}
        py={6}
        px={6}
        borderRadius="2xl"
        spacing={5}
        gap={5}
        border="1px solid #334155"
        backgroundColor="#0f172a"
        boxShadow="0 0 12px rgba(30, 58, 138, 0.3)"
      >
        <Box w="full">
          <Text color="blue.100" fontWeight="semibold">
            Job Title:
          </Text>
          <Input
            type="text"
            fontSize={14}
            color="white"
            placeholder="Job Title..."
            size="sm"
            value={jobInputs.title}
            onChange={(e) =>
              setJobInputs({ ...jobInputs, title: e.target.value })
            }
            variant="flushed"
            focusBorderColor="blue.400"
            _placeholder={{ color: 'blue.300' }}
            bg="#0f172a"
          />
        </Box>

        <Box w="full">
          <Text color="blue.100" fontWeight="semibold">
            Job Description:
          </Text>
          <Input
            type="text"
            fontSize={14}
            color="white"
            placeholder="Job Description..."
            size="sm"
            value={jobInputs.description}
            onChange={(e) =>
              setJobInputs({ ...jobInputs, description: e.target.value })
            }
            variant="flushed"
            focusBorderColor="blue.400"
            _placeholder={{ color: 'blue.300' }}
            bg="#0f172a"
          />
        </Box>

        <Box w="full">
          <Text color="blue.100" fontWeight="semibold">
            Job Price:
          </Text>
          <Input
            type="text"
            fontSize={14}
            color="white"
            placeholder="Price..."
            size="sm"
            value={jobInputs.price}
            onChange={(e) =>
              setJobInputs({ ...jobInputs, price: e.target.value })
            }
            variant="flushed"
            focusBorderColor="blue.400"
            _placeholder={{ color: 'blue.300' }}
            bg="#0f172a"
          />
        </Box>

        <Box w="full">
          <Text color="blue.100" fontWeight="semibold">
            Job Domain:
          </Text>
          <Input
            type="text"
            fontSize={14}
            color="white"
            placeholder="Job Domain..."
            size="sm"
            value={jobInputs.jobDomain}
            onChange={(e) =>
              setJobInputs({ ...jobInputs, jobDomain: e.target.value })
            }
            variant="flushed"
            focusBorderColor="blue.400"
            _placeholder={{ color: 'blue.300' }}
            bg="#0f172a"
          />
        </Box>

        <Box w="full" pt={3}>
          <Button
            bg="blue.600"
            color="white"
            fontSize="sm"
            w="full"
            onClick={postJob}
            _hover={{
              bg: 'blue.400',
              color: '#0A0E1A',
              boxShadow: '0 0 10px rgba(59, 130, 246, 0.6)',
            }}
          >
            Post Job
          </Button>
        </Box>
      </VStack>
    </>
  );
};

export default PostJobForm;
