import Navbar from '../../components/Navbar/Navbar';
import { Box, Button, Flex, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { AiOutlineMenu } from 'react-icons/ai';
import Chatbot from '../../components/Chatbot/Chatbot';
// import Footer from '../../components/Footer/Footer';

const PageLayout = ({ children }) => {
  const [isMenu, setIsMenu] = useState(false);
  const [isAuth, setIsAuth] = useState(localStorage.getItem('user'));

  return (
    <Box bg="#0A0E1A" minH="100vh">
      {/* Navbar with single color background */}
      <Box 
        bg='transparent'  // A darker solid color that will match the theme
        w="full"
      >
        <Navbar isAuth={isAuth} />
      </Box>

      {/* Main content layout */}
      <Flex>
        {/* Sidebar Toggle + Sidebar */}
        {isAuth && (
          <VStack spacing={0}>
            <Flex w="full" h="10vh" px={3} alignItems="center">
              <Button
                backgroundColor="whiteAlpha.100"
                onClick={() => setIsMenu(!isMenu)}
                shadow="md"
                _hover={{ backgroundColor: "whiteAlpha.200" }}
                py={4}
                px={2}
              >
                <AiOutlineMenu color="white" size={30} />
              </Button>
            </Flex>

            {/* ChatBot */}
            <Flex position={'fixed'} zIndex={0}>
              <Chatbot/>
            </Flex>

            {isMenu && (
              <Box w={{ base: "70px", md: "240px" }}>
                <Sidebar />
              </Box>
            )}
          </VStack>
        )}

        {/* Page Content */}
        <Box
          flex={1}
          w={{ base: "calc(100% - 70px)", md: "calc(100% - 240px)" }}
          maxH="90vh"
          overflowY="auto"
          px={4}
          py={2}
          color="white"
        >
          {children}
        </Box>
      </Flex>

      {/* ChatBot */}
      
          <Chatbot/>
    </Box>
  );
};

export default PageLayout;
