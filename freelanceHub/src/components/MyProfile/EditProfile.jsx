import React, { useState } from 'react';
import {
  Box, Button, CloseButton, Dialog, Flex,
  Input, Portal, Text, VStack
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

const EditProfile = ({ details }) => {
  const [inputs, setInputs] = useState({
    // username: details?.username || "",
    // email: details?.email || "",
    skills: details?.skills || [""],
    experience: details?.experience || "",
    domain: details?.domain || "",
    bio: details?.bio || "",
    githubLink: details?.githubLink || ""
  });

  const [file, setFile] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: name === "skills" ? value.split(',').map(skill => skill.trim()) : value
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users/updateProfile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(inputs)
      });

      if (!response.ok) throw new Error('Failed to update profile');

      if (file) {
        const formData = new FormData();
        formData.append("image", file);

        const imageResponse = await fetch("http://localhost:8080/api/users/uploadProfileImage", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!imageResponse.ok) throw new Error("Image upload failed");

        const imageData = await imageResponse.json();
        console.log("Image uploaded successfully:", imageData);
      }

      alert("Profile updated successfully.");
      navigate('/profile');
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <Box py={2}>
      <Dialog.Root size={'lg'} placement={'center'}>
        <Dialog.Trigger asChild>
          <Flex gap={2} alignItems={'center'} cursor={'pointer'} color={'blue.700'}>
            <Button
              bg={'white'}
              color={'black'}
              _hover={{ bg: "whiteAlpha.800" }}
              size={{ base: 'xs', md: "sm" }}
            >
              Edit Profile
            </Button>
          </Flex>
        </Dialog.Trigger>

        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content backgroundColor="#0f172a" borderRadius="2xl" border="1px solid #334155">
              <Dialog.Body>
                <VStack
                  w={'full'}
                  mt={10}
                  py={5}
                  px={5}
                  spacing={4}
                  borderRadius={10}
                  background="linear-gradient(135deg, #243B55, #141E30)"
                  border="2px solid rgba(100, 170, 240, 0.9)"
                  boxShadow="0 0 15px rgba(59, 130, 246, 0.4)"
                >
                  {[
                    // "username", "email", 
                    "skills", "bio", "domain", "experience", "githubLink"].map(field => (
                    <Flex key={field} w={'full'} py={2} alignItems={'baseline'} gap={3}>
                      <Text color="blue.100" fontWeight="semibold" w="40%">
                        {field.charAt(0).toUpperCase() + field.slice(1)}:
                      </Text>
                      <Input
                        type="text"
                        name={field}
                        value={field === "skills" ? inputs.skills.join(", ") : inputs[field]}
                        onChange={handleChange}
                        placeholder={field + "..."}
                        fontSize={14}
                        size={'sm'}
                        variant={'flushed'}
                        color="white"
                        // bg="#0f172a"
                        focusBorderColor="blue.400"
                        _placeholder={{ color: 'blue.300' }}
                      />
                    </Flex>
                  ))}

                  <Flex w={'full'} py={2} alignItems={'baseline'} gap={3}>
                    <Text color="blue.100" fontWeight="semibold" w="40%">
                      Profile Image:
                    </Text>
                    <Input
                      name="profileImage"
                      type="file"
                      onChange={handleFileChange}
                      fontSize={14}
                      size="sm"
                      color="white"
                      variant="flushed"
                      // bg="#0f172a"
                      focusBorderColor="blue.400"
                      _placeholder={{ color: 'blue.300' }}
                    />
                  </Flex>

                  <Box w={'3/5'} py={5}>
                    <Button
                      bg="blue.600"
                      color="white"
                      fontSize="sm"
                      w="full"
                      onClick={handleSave}
                      _hover={{
                        bg: "blue.400",
                        color: "#0A0E1A",
                        boxShadow: "0 0 10px rgba(59, 130, 246, 0.6)"
                      }}
                    >
                      Save
                    </Button>
                  </Box>
                </VStack>
              </Dialog.Body>

              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" color="white" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
};

export default EditProfile;
