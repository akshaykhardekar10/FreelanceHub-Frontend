import React, { useEffect, useState } from 'react';
import {
  Flex,
  Text,
  VStack,
  Box,
  Button,
  Dialog,
  Portal,
  Input,
  CloseButton,
  Container,
  Fieldset,
  Field,
  Textarea
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import GetApplications from '../JobApplicationForm/GetApplications';

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const Job = ({ title, description, price, jobId, owner, date, domain, postedBy }) => {
  const [isApplied, setIsApplied] = useState(false);
  const [showTopOpen, setShowTopOpen] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [candLoading, setCandLoading] = useState(false);
  const [candError, setCandError] = useState("");
  const [candLimit, setCandLimit] = useState(10);
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const showApplication = pathname === "/my-posts";

  const [formData, setFormData] = useState({
    name: currentUser?.username || '',
    email: currentUser?.email || '',
    githubLink: currentUser?.githubLink || '',
    coverLetter: '',
    bidPrice: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openTopFreelancers = async () => {
    setShowTopOpen(true);
    setCandLimit(10);
    setCandError("");
    setCandLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/api/matching/users-for-job/${jobId}?limit=10`);
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || `Failed with ${res.status}`);
      }
      const data = await res.json();
      setCandidates(Array.isArray(data) ? data : []);
    } catch (err) {
      setCandError(err.message || 'Failed to load candidates');
    } finally {
      setCandLoading(false);
    }
  };

  // Initialize isApplied from localStorage so state is consistent across pages
  useEffect(() => {
    try {
      const raw = localStorage.getItem('appliedJobs');
      const list = raw ? JSON.parse(raw) : [];
      if (Array.isArray(list) && list.includes(jobId)) {
        setIsApplied(true);
      }
    } catch (_) {}
  }, [jobId]);

  const loadMoreCandidates = async () => {
    const next = candLimit + 10;
    setCandLimit(next);
    setCandLoading(true);
    setCandError("");
    try {
      const res = await fetch(`http://localhost:8080/api/matching/users-for-job/${jobId}?limit=${next}`);
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || `Failed with ${res.status}`);
      }
      const data = await res.json();
      setCandidates(Array.isArray(data) ? data : []);
    } catch (err) {
      setCandError(err.message || 'Failed to load more');
    } finally {
      setCandLoading(false);
    }
  };

  const applyJob = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/jobApplications/${jobId}/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          coverLetter: formData.coverLetter,
          bidPrice: formData.bidPrice,
        }),
      });

      if (res.ok) {
        alert('Applied successfully.');
        // Mark as applied locally and persist
        setIsApplied(true);
        try {
          const raw = localStorage.getItem('appliedJobs');
          const list = raw ? JSON.parse(raw) : [];
          if (!list.includes(jobId)) {
            list.push(jobId);
            localStorage.setItem('appliedJobs', JSON.stringify(list));
          }
        } catch (_) {}
      } else {
        const errorText = await res.text();
        alert(errorText || 'Job application failed!');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <Box pe={10} py={5} w="full" position="relative">
      <MotionBox
        background="linear-gradient(135deg, #1F2C3C, #324A5E)" // ✅ brighter background shade
        w="full"
        shadow="lg"
        borderRadius={10}
        p={5}
        _hover={{ transform: 'scale(1.02)', transition: 'transform 0.3s ease-in-out' }}
        position="relative"
        zIndex={2}
      >
        <VStack w="4/5" py={5} px={10}>
          <Flex w="full" justifyContent="space-between">
            <Flex color="whiteAlpha.900" gap={2} alignItems="baseline">
              <Text fontWeight="bold">Job Title:</Text>
              <Text>{title}</Text>
            </Flex>
            <Flex color="whiteAlpha.900" gap={2} alignItems="baseline">
              <Text fontWeight="bold">Posted at:</Text>
              <Text>{date}</Text>
            </Flex>
          </Flex>

          <Box color="whiteAlpha.900" w="full" h="20vh">
            <Text fontWeight="bold">Job Description:</Text>
            <Box overflowY="hidden" w="full" h="10vh">
              <Text>{description}</Text>
            </Box>
          </Box>

          <Flex color="whiteAlpha.900" w="full" gap={2} alignItems="baseline">
            <Text fontWeight="bold">Budget:</Text>
            <Text>{price}</Text>
          </Flex>

          <Flex color="whiteAlpha.900" w="full" gap={2} alignItems="baseline">
            <Text fontWeight="bold">Owner:</Text>
            <Text>{owner}</Text>
          </Flex>
        </VStack>

        <Flex w="full" justifyContent="flex-end">
          <VStack alignItems="flex-end" spacing={3} w="full">
          {showApplication && (
            <Dialog.Root size="cover" placement="center">
              <Dialog.Trigger asChild>
                <MotionButton
                  variant="outline"
                  size="sm"
                  whileHover={{ scale: 1.05, boxShadow: 'lg' }}
                  whileTap={{ scale: 0.98 }}
                  colorScheme="blue"
                  borderColor="blue.500"
                  onClick={openTopFreelancers}
                >
                  Show Top Freelancers
                </MotionButton>
              </Dialog.Trigger>
              <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                  <Dialog.Content maxH="80vh" overflowY="auto" bg="#1A2233" color="white">
                    <Dialog.Body>
                      {candError && (
                        <Text color='red.300' fontSize='sm' mb={2}>{candError}</Text>
                      )}
                      {!candLoading && candidates.length===0 && (
                        <Text color='whiteAlpha.800'>No matches yet.</Text>
                      )}
                      <VStack alignItems='stretch' spacing={3}>
                        {candidates.map((u, idx)=> (
                          <Box
                            key={idx}
                            p={3}
                            borderWidth='1px'
                            borderColor='blue.300'
                            borderRadius='md'
                            bg='rgba(255,255,255,0.02)'
                            _hover={{ bg: 'rgba(59,130,246,0.1)', cursor: 'pointer' }}
                            onClick={()=>{
                              try { localStorage.setItem('freelancerProfile', JSON.stringify(u)); } catch(_) {}
                              const username = u.username || u.email || u.id;
                              if (username) navigate(`/${username}`);
                            }}
                          >
                            <Flex gap={2} wrap='wrap'>
                              <Text fontWeight='bold'>User:</Text>
                              <Text>{u.username || u.email || u.id}</Text>
                            </Flex>
                            <Flex gap={2}>
                              <Text fontWeight='bold'>Similarity Score:</Text>
                              <Text>{typeof u.similarityScore === 'number' ? u.similarityScore.toFixed(4) : u.similarityScore}</Text>
                            </Flex>
                            {u.skills && u.skills.length>0 && (
                              <Flex gap={2} wrap='wrap'>
                                <Text fontWeight='bold'>Skills:</Text>
                                <Text>{u.skills.join(', ')}</Text>
                              </Flex>
                            )}
                          </Box>
                        ))}
                      </VStack>
                      {candidates.length>=10 && (
                        <Flex justifyContent='center' mt={3}>
                          <Button onClick={loadMoreCandidates} isDisabled={candLoading} variant='outline' size='sm' colorScheme='blue' borderColor='blue.500'>
                            {candLoading? 'Loading...' : 'Show More'}
                          </Button>
                        </Flex>
                      )}
                    </Dialog.Body>
                    <Dialog.CloseTrigger asChild>
                      <CloseButton size="sm" />
                    </Dialog.CloseTrigger>
                  </Dialog.Content>
                </Dialog.Positioner>
              </Portal>
            </Dialog.Root>
          )}
          {showApplication ? (
            <Dialog.Root size="cover" placement="center">
              <Dialog.Trigger asChild>
                <MotionButton
                  variant="outline"
                  size="sm"
                  whileHover={{ scale: 1.05, boxShadow: 'lg' }}
                  whileTap={{ scale: 0.98 }}
                  colorScheme="teal"
                  borderColor="teal.500"
                  _hover={{
                    bg: 'teal.500',
                    color: '#0A0E1A',
                    // boxShadow: '0 0 8px rgba(0, 255, 255, 0.5)',
                  }}
                >
                  Applications
                </MotionButton>
              </Dialog.Trigger>
              <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                  <Dialog.Content>
                    <Dialog.Body>
                      <GetApplications jobId={JSON.stringify(jobId)} />
                    </Dialog.Body>
                    <Dialog.CloseTrigger asChild>
                      <CloseButton size="sm" />
                    </Dialog.CloseTrigger>
                  </Dialog.Content>
                </Dialog.Positioner>
              </Portal>
            </Dialog.Root>
          ) : (
                currentUser.id !== JSON.parse(postedBy) && (
                  <>
                    {isApplied ? (
                      <Button
                        variant="outline"
                        size="sm"
                        colorScheme="teal"
                        borderColor="teal.500"
                        isDisabled
                      >
                        Applied
                      </Button>
                    ) : (
                      <Dialog.Root size="lg" placement="center">
                        <Dialog.Trigger asChild>
                          <MotionButton
                            variant="outline"
                            size="sm"
                            whileHover={{ scale: 1.05, boxShadow: 'lg' }}
                            whileTap={{ scale: 0.98 }}
                            colorScheme="teal"
                            borderColor="teal.500"
                            _hover={{
                              bg: 'teal.500',
                              color: '#0A0E1A',
                              // boxShadow: '0 0 8px rgba(0, 255, 255, 0.5)',
                            }}
                          >
                            Apply
                          </MotionButton>
                        </Dialog.Trigger>
                        <Portal>
                          <Dialog.Backdrop />
                          <Dialog.Positioner>
                            <Dialog.Content>

                        <Dialog.Body>
                          <VStack
                            bgGradient="linear(to-br, #0f172a, #1e293b)"
                            borderRadius="xl"
                            border="1px solid #334155"
                            backgroundColor="#3a4a5a"
                            p={6}
                            spacing={6}
                          >
                            <Fieldset.Root
                              size="lg"
                              w="full"
                              mx="auto"
                              p="6"
                              bgGradient="linear(to-br, #1e3a8a, #0ea5e9)"
                              // boxShadow="0 0 10px rgba(0, 255, 255, 0.3)"
                              borderRadius="2xl"
                              // border="1px solid #3b82f6"
                              backgroundColor="#3a4a5a"
                            >
                              <VStack spacing="6" >
                                <VStack spacing="2" textAlign="center">
                                  <Fieldset.Legend fontSize="2xl" fontWeight="bold" color="white">
                                    Job Application Form
                                  </Fieldset.Legend>
                                  <Fieldset.HelperText fontSize="sm" color="blue.100">
                                    Please fill out the form carefully to apply for the job.
                                  </Fieldset.HelperText>
                                </VStack>

                                <Fieldset.Content mb={5}>
                                  <Field.Root>
                                    <Field.Label color="blue.100">Name</Field.Label>
                                    <Input
                                      bg="#0f172a"
                                      color="white"
                                      border="1px solid #3b82f6"
                                      _hover={{ boxShadow: '0 0 6px #60a5fa' }}
                                      _focus={{ boxShadow: '0 0 8px #3b82f6' }}
                                      name="name"
                                      value={formData.name}
                                      onChange={handleChange}
                                      placeholder="Enter your full name"
                                      _placeholder={{ color: 'blue.300' }}
                                      isRequired
                                    />
                                  </Field.Root>
                                  <Field.Root>
                                    <Field.Label color="blue.100">Email Address</Field.Label>
                                    <Input
                                      bg="#0f172a"
                                      color="white"
                                      border="1px solid #3b82f6"
                                      _hover={{ boxShadow: '0 0 6px #60a5fa' }}
                                      _focus={{ boxShadow: '0 0 8px #3b82f6' }}
                                      name="email"
                                      type="email"
                                      value={formData.email}
                                      onChange={handleChange}
                                      placeholder="Enter your email"
                                      _placeholder={{ color: 'blue.300' }}
                                      isRequired
                                    />
                                  </Field.Root>
                                  <Field.Root>
                                    <Field.Label color="blue.100">Bid Price</Field.Label>
                                    <Input
                                      bg="#0f172a"
                                      color="white"
                                      border="1px solid #3b82f6"
                                      _hover={{ boxShadow: '0 0 6px #60a5fa' }}
                                      _focus={{ boxShadow: '0 0 8px #3b82f6' }}
                                      name="bidPrice"
                                      type="text"
                                      value={formData.bidPrice}
                                      onChange={handleChange}
                                      placeholder="Enter your bid price"
                                      _placeholder={{ color: 'blue.300' }}
                                      isRequired
                                    />
                                  </Field.Root>
                                  <Field.Root>
                                    <Field.Label color="blue.100">Sample Work</Field.Label>
                                    <Input
                                      bg="#0f172a"
                                      color="white"
                                      border="1px solid #3b82f6"
                                      _hover={{ boxShadow: '0 0 6px #60a5fa' }}
                                      _focus={{ boxShadow: '0 0 8px #3b82f6' }}
                                      name="githubLink"
                                      value={formData.githubLink}
                                      onChange={handleChange}
                                      placeholder="Sample work reference link..."
                                      _placeholder={{ color: 'blue.300' }}
                                      isRequired
                                    />
                                  </Field.Root>
                                  <Field.Root>
                                    <Field.Label color="blue.100">Cover Letter</Field.Label>
                                    <Textarea
                                      bg="#0f172a"
                                      color="white"
                                      border="1px solid #3b82f6"
                                      _hover={{ boxShadow: '0 0 6px #60a5fa' }}
                                      _focus={{ boxShadow: '0 0 8px #3b82f6' }}
                                      name="coverLetter"
                                      value={formData.coverLetter}
                                      onChange={handleChange}
                                      placeholder="Tell us why you're a great fit for this role..."
                                      rows={5}
                                      _placeholder={{ color: 'blue.300' }}
                                      isRequired
                                    />
                                  </Field.Root>
                                </Fieldset.Content>

                                <Button
                                  type="submit"
                                  onClick={applyJob}

                                 variant={'outline'}
                              size="sm"
                              whileHover={{ scale: 1.05, boxShadow: 'lg' }}
                              whileTap={{ scale: 0.98 }}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.4 }}
                              colorScheme="blue"
                              borderColor="blue.500"
                              backgroundColor={'blue.600'}
                              _hover={{
                                bg: 'blue.400',
                                color: '#0A0E1A',
                                borderColor: 'blue.400',
                                boxShadow: '0 0 8px rgba(0, 0, 255, 0.5)',
                              }} 
                                >
                                   Submit Application
                                </Button>
                              </VStack>
                            </Fieldset.Root>
                          </VStack>
                        </Dialog.Body>

                          
                          <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                          </Dialog.CloseTrigger>
                            </Dialog.Content>
                          </Dialog.Positioner>
                        </Portal>
                      </Dialog.Root>
                    )}
                  </>
                )
              )}
            </VStack>
          </Flex>
        </MotionBox>
      </Box>
  );
};
export default Job;
