import React, {use, useState} from 'react'
import { Alert, Box, Button, Input, Toaster } from '@chakra-ui/react' 
import { InputGroup } from '../ui/input-group'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
// import useAuthStore from '../../Store/authStore'
import { toaster } from '../ui/toaster'
import useShowToast from '../../Hooks/useShowToast'
import { motion } from 'framer-motion';

const MotionButton = motion(Button);

const Signup = () => {
    const [inputs, setInputs] = useState({
        // fullname:'',
        username:'',
        email:'',
        password:'',
    })

    const [showPassword, setShowPassword] = useState(false)

    const showToast = useShowToast()

    const navigate = useNavigate()

    const handleSignup = async ()=>{

     if(!inputs.username && !inputs.email && !inputs.email && !inputs.password ){
      showToast( 'Error',"Please fill all the fields.", 'error')
     }
     else{
      try {
        const res = await fetch('http://localhost:8080/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(inputs),
        });
    
        if (res.ok) {
          alert('Signup successful!');
          console.log(res)
         
          navigate('/login');
        } else {
          const errorText = await res.text(); 
          alert(errorText || 'Signup failed!');
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
      
     }
    }
    

  return (
    <>
    <Input type='email' fontSize={14} 
    placeholder='Email' 
    size={'sm'}
    color='white'
    value={inputs.email}
    onChange={(e)=>setInputs({...inputs,email:e.target.value})}
    borderStyle={'none'}
        border={'1px solid'}
        borderColor="purple.400"
        outlineColor={'purple.500'}
    />

    <Input type='text' fontSize={14} 
    placeholder='Username' 
    size={'sm'}
    color='white'
    value={inputs.username}
    onChange={(e)=>setInputs({...inputs,username:e.target.value})}
    borderStyle={'none'}
        border={'1px solid'}
        borderColor="purple.400"
        outlineColor={'purple.500'}
    />

    <InputGroup
    w={'full'}
    endElement={
        <Box h={'full'} position={'absolute'} left={-3}>
        <Button variant={'ghost'} size={'sm'} onClick={()=>{setShowPassword(!showPassword)}} px={0} 
        >
            {/* {showPassword ? <IoMdEye/> : <IoMdEyeOff/>} */}
        </Button>
        </Box>
    }
    >
    <Input type={showPassword ? 'text': 'password'}
    fontSize={14} 
    placeholder='Password'
    color='white'
    value={inputs.password}
    onChange={(e)=>setInputs({...inputs,password:e.target.value})}
    size={'sm'}
    borderStyle={'none'}
        border={'1px solid'}
        borderColor="purple.400"
        outlineColor={'purple.500'}
    />
    </InputGroup>
    <MotionButton
    variant="outline"
    size="sm"
    whileHover={{ scale: 1.05, boxShadow: 'lg' }}
    whileTap={{ scale: 0.98 }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4 }}
    colorScheme="purple"
    borderColor="purple.500"
    backgroundColor={'purple.500'}
    _hover={{
      bg: 'purple.400',
      color: '#0A0E1A',
      borderColor: 'purple.400',
      boxShadow: '0 0 8px rgba(128, 0, 128, 0.5)',
    }}
    w={"full"} fontSize={"sm"} 
    onClick={handleSignup}
    >Sign up</MotionButton>
    
    {/* <Toaster/> */}
    </>
  )
}

export default Signup