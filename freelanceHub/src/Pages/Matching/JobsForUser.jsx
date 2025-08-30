import React, { useEffect, useState } from "react";
import { VStack, Box, Container, Input, Button, Text, Flex, Dialog, Portal, CloseButton, Fieldset, Field, Textarea } from "@chakra-ui/react";
import { motion } from "framer-motion";

const JobsForUser = () => {
  const [userId, setUserId] = useState("");
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState([]);
  const [applyOpenId, setApplyOpenId] = useState(null);
  const [applyLoading, setApplyLoading] = useState(false);
  const [applyError, setApplyError] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", githubLink: "", coverLetter: "", bidPrice: "" });
  const [appliedIds, setAppliedIds] = useState(new Set());
  const token = localStorage.getItem('token');

  // Try to derive current user's ID from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return;
      let parsed = null;
      try {
        parsed = JSON.parse(raw);
      } catch (_) {
        // not JSON, maybe the id itself
      }

      const candidate = parsed?.id || parsed?._id || parsed?.userId || (typeof raw === "string" ? raw : "");
      if (candidate && typeof candidate === "string") {
        setUserId(candidate);
      }
    } catch (e) {
      // ignore and keep userId empty
    }
  }, []);

  useEffect(()=>{
    try{
      const raw = localStorage.getItem('user');
      if(!raw) return;
      const usr = JSON.parse(raw);
      setFormData((p)=>({
        ...p,
        name: usr?.username || p.name,
        email: usr?.email || p.email,
        githubLink: usr?.githubLink || p.githubLink
      }))
    }catch(_){/* ignore */}
  },[])

  // Initialize applied state from localStorage so button state persists across pages
  useEffect(()=>{
    try{
      const raw = localStorage.getItem('appliedJobs');
      const list = raw ? JSON.parse(raw) : [];
      if(Array.isArray(list)){
        setAppliedIds(new Set(list));
      }
    }catch(_){/* ignore */}
  },[])

  const fetchMatches = async () => {
    try {
      setLoading(true);
      setError("");
      const url = `http://localhost:8080/api/matching/jobs-for-user/${userId}?limit=${limit}`;
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openApply = (job) => {
    const id = job.id || job.jobId || job._id;
    if(!id) return;
    setApplyError("");
    setApplyOpenId(id);
  };

  const submitApplication = async (job) => {
    const id = job.id || job.jobId || job._id;
    if(!id) return;
    try{
      setApplyLoading(true);
      setApplyError("");
      const res = await fetch(`http://localhost:8080/api/jobApplications/${id}/apply`,{
        method:'POST',
        headers:{ 'Content-Type':'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ coverLetter: formData.coverLetter, bidPrice: formData.bidPrice })
      });
      if(!res.ok){
        const t = await res.text();
        throw new Error(t||`Failed with ${res.status}`);
      }
      alert('Applied successfully.');
      setApplyOpenId(null);
      // Persist applied job id and update local state
      try{
        const raw = localStorage.getItem('appliedJobs');
        const list = raw ? JSON.parse(raw) : [];
        if(!list.includes(id)){
          list.push(id);
          localStorage.setItem('appliedJobs', JSON.stringify(list));
        }
        setAppliedIds(new Set(list));
      }catch(_){/* ignore */}
    }catch(err){
      setApplyError(err.message||'Application failed');
    }finally{
      setApplyLoading(false);
    }
  }

  const showMore = async () => {
    const next = limit + 10;
    setLimit(next);
    await new Promise((r) => setTimeout(r, 0));
    await fetchMatches();
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
            <Text color="whiteAlpha.800" fontSize="sm">
              {userId ? "Detected your account. Click the button to fetch jobs." : "We couldn't detect your user automatically. Please login first."}
            </Text>
          </Box>

          <Flex w="full" gap={4} alignItems="center">
            <Button
              onClick={fetchMatches}
              isDisabled={!userId || loading}
              variant={"outline"}
              size="sm"
              colorScheme="blue"
              borderColor="blue.500"
              backgroundColor={"blue.600"}
              _hover={{ bg: "blue.400", color: "#0A0E1A", borderColor: "blue.400", boxShadow: "0 0 8px rgba(0, 0, 255, 0.5)" }}
            >
              {loading ? "Loading..." : "Find Jobs For Me"}
            </Button>
          </Flex>

          {error && (
            <Text color="red.300" fontSize="sm">{error}</Text>
          )}
        </VStack>

        <Box my={6} borderBottomWidth="1px" borderColor="blue.300" />

        <VStack alignItems="stretch" spacing={4}>
          {results.length === 0 && !loading && (
            <Text color="whiteAlpha.800">No matches yet. Enter a user ID and click Find.</Text>
          )}
          {results.map((job, idx) => (
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
                  <Text fontWeight="bold">Job Title:</Text>
                  <Text>{job.title || job.jobTitle || "Untitled"}</Text>
                </Flex>
                <Flex color="whiteAlpha.900" gap={2} alignItems="baseline">
                  <Text fontWeight="bold">Similarity Score:</Text>
                  <Text>{typeof job.similarityScore === "number" ? job.similarityScore.toFixed(4) : job.similarityScore}</Text>
                </Flex>
                {job.description && (
                  <Box color="whiteAlpha.900" w="full">
                    <Text fontWeight="bold">Description:</Text>
                    <Text noOfLines={3}>{job.description}</Text>
                  </Box>
                )}
                {job.postedBy && (
                  <Flex color="whiteAlpha.900" gap={2} alignItems="baseline">
                    <Text fontWeight="bold">Posted By:</Text>
                    <Text>{job.postedBy.username || job.postedBy.email}</Text>
                  </Flex>
                )}

                <Flex w="full" justifyContent="flex-end" mt={2}>
                  <Dialog.Root size="lg" placement="center" open={applyOpenId === (job.id || job.jobId || job._id)} onOpenChange={(e)=>{ if(!e.open) setApplyOpenId(null); }}>
                    <Dialog.Trigger asChild>
                      <Button
                        variant={"outline"}
                        size="sm"
                        colorScheme="teal"
                        borderColor="teal.500"
                        onClick={()=>openApply(job)}
                        isDisabled={appliedIds.has(job.id || job.jobId || job._id)}
                      >
                        {appliedIds.has(job.id || job.jobId || job._id) ? 'Applied' : 'Apply For Job'}
                      </Button>
                    </Dialog.Trigger>
                    <Portal>
                      <Dialog.Backdrop />
                      <Dialog.Positioner>
                        <Dialog.Content maxH="85vh" overflowY="auto" bg="#1A2233" color="white">
                          <Dialog.Body>
                            {applyError && <Text color='red.300' mb={2}>{applyError}</Text>}
                            <VStack
                              bgGradient="linear(to-br, #0f172a, #1e293b)"
                              borderRadius="xl"
                              border="1px solid #334155"
                              backgroundColor="#3a4a5a"
                              p={6}
                              spacing={6}
                            >
                              <Fieldset.Root size="lg" w="full" mx="auto" p="6" bgGradient="linear(to-br, #1e3a8a, #0ea5e9)" borderRadius="2xl" backgroundColor="#3a4a5a">
                                <VStack spacing="6">
                                  <VStack spacing="2" textAlign="center">
                                    <Fieldset.Legend fontSize="2xl" fontWeight="bold" color="white">Job Application Form</Fieldset.Legend>
                                    <Fieldset.HelperText fontSize="sm" color="blue.100">Please fill out the form carefully to apply for the job.</Fieldset.HelperText>
                                  </VStack>
                                  <Fieldset.Content mb={5}>
                                    <Field.Root>
                                      <Field.Label color="blue.100">Name</Field.Label>
                                      <Input name="name" value={formData.name} onChange={handleChange} bg="#0f172a" color="white" border="1px solid #3b82f6" _placeholder={{color:'blue.300'}} placeholder="Enter your full name" />
                                    </Field.Root>
                                    <Field.Root>
                                      <Field.Label color="blue.100">Email Address</Field.Label>
                                      <Input name="email" type="email" value={formData.email} onChange={handleChange} bg="#0f172a" color="white" border="1px solid #3b82f6" placeholder="Enter your email" _placeholder={{color:'blue.300'}} />
                                    </Field.Root>
                                    <Field.Root>
                                      <Field.Label color="blue.100">Bid Price</Field.Label>
                                      <Input name="bidPrice" value={formData.bidPrice} onChange={handleChange} bg="#0f172a" color="white" border="1px solid #3b82f6" placeholder="Enter your bid price" _placeholder={{color:'blue.300'}} />
                                    </Field.Root>
                                    <Field.Root>
                                      <Field.Label color="blue.100">Sample Work</Field.Label>
                                      <Input name="githubLink" value={formData.githubLink} onChange={handleChange} bg="#0f172a" color="white" border="1px solid #3b82f6" placeholder="Sample work reference link..." _placeholder={{color:'blue.300'}} />
                                    </Field.Root>
                                    <Field.Root>
                                      <Field.Label color="blue.100">Cover Letter</Field.Label>
                                      <Textarea name="coverLetter" value={formData.coverLetter} onChange={handleChange} rows={5} bg="#0f172a" color="white" border="1px solid #3b82f6" placeholder="Tell us why you're a great fit for this role..." _placeholder={{color:'blue.300'}} />
                                    </Field.Root>
                                  </Fieldset.Content>
                                  <Button onClick={()=>submitApplication(job)} isDisabled={applyLoading} variant={'outline'} size="sm" colorScheme="blue" borderColor="blue.500" backgroundColor={'blue.600'} _hover={{ bg: 'blue.400', color: '#0A0E1A', borderColor: 'blue.400' }}>
                                    {applyLoading? 'Submitting...' : 'Submit Application'}
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
                </Flex>
              </VStack>
            </Box>
          ))}
          {userId && results.length >= 10 && (
            <Flex justifyContent="center" mt={2}>
              <Button
                onClick={showMore}
                isDisabled={loading}
                variant={"outline"}
                size="sm"
                colorScheme="blue"
                borderColor="blue.500"
                _hover={{ bg: "blue.400", color: "#0A0E1A" }}
              >
                {loading ? "Loading..." : "Show More"}
              </Button>
            </Flex>
          )}
        </VStack>
      </Container>
    </VStack>
  );
};

export default JobsForUser;
