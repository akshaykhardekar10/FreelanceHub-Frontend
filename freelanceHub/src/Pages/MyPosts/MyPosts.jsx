import Job from "../../components/Jobs/Job"
import { VStack, Container } from '@chakra-ui/react'
import React, {  useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"

const MyPosts = () => {
    const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const [selectedDomain,setSelectedDomain] = useState("");
  const  currentUser = JSON.parse(localStorage.getItem('user'))
 

const token = localStorage.getItem('token')
const [isToken, setIsToken] = useState(token);
        
    
useEffect(() => {
  if (!isToken) {
    console.error("No access token found");
    return;
  }
  // Fetch freelancers with the access token
  fetch("http://localhost:8080/api/jobs/getAllJobs", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,  // Use token from context in the Authorization header
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch freelancers");
      }
      return  res.json();
      // console.log(d
    })
    .then((data) => {
      setJobs(data);  // Update freelancers state with the fetched data
      // console.log(data)
    })
    .catch((err) => {
      console.error("Error:", err);
    });
}, [token]);  // Dependency array includes token, so the effect runs when the token changes
// console.log(jobs)
  return (
    <>
    <VStack backgroundColor={'transparent'} my={5} borderRadius={15} py={5} minH={'100vh'}>

        {/* Jobs */}
        <Container w={'4/5'}>

          {   
              jobs.map((e,key)=>{
                // console.log(e.jobId)
                
                if(JSON.stringify(currentUser.id) == JSON.stringify(e.postedById)){
    
                    return(
                        <>
                        <Job 
                        title={e.title} 
                        description={e.description} 
                        price={e.price} 
                        owner={e.postedByUsername}
                        date={e.date}
                        domain={e.jobDomain}
                        key={e.jobId}
                        jobId={e.jobId}
                        postedBy = {JSON.stringify(e.postedById)}
                        />
                        
                        </>
                      )
                }
                else{
                    return null
                }
              })
          }
        </Container>
        
    </VStack>
    
    </>
  )
}

export default MyPosts