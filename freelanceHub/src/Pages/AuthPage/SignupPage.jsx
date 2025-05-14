import { Box, Container, Flex, Image, VStack} from '@chakra-ui/react'
import React from 'react'
import SignupForm from '../../components/AuthForm//SignupForm'
// import useAuthStore from '../../Store/authStore'
// import { Toaster } from '../../components/ui/toaster'

const SignupPage = () => {
    // const isAuth = useAuthStore(state => state.user)

  return (
    <>
    
    <Flex alignItems={"center"} justifyContent={"center"} minH={"90vh"} p={4} color={"white"} backgroundColor={'transparent'}>
        <Container minW={"container.md"} p={0} >
            <Flex alignItems={"center"} justifyContent={"center"} >
                {/* left side image */}
                <Box display={{base:"none", md:"block"}}>
                    <Image src='/Logo/img1.svg' h={600}/>
                </Box>

                {/* right side form */}
                <VStack wordSpacing={4} align={"stretch"} w={{base:"50vw", md:"25vw"}} mr={10}>
                    <SignupForm/>
                    <Box textAlign={"center"}>Get the App.</Box>
                </VStack>
            </Flex>
        </Container>
    </Flex>
    
    </>
  )
}

export default SignupPage