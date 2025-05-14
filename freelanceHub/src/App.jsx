import HomePage from "./Pages/HomePage/HomePage"
import PageLayout from "./Layouts/PageLayout/PageLayout"
import { Route, Routes } from "react-router-dom"
import GetJob from "./Pages/GetJob/GetJob"
import JobApplication from "./Pages/GetJob/JobApplication"
import HireJob from "./Pages/HireJob/HireJob"
import FreelancerProfile from "./Pages/FreelancerProfile/FreelancerProfile"
import LoginPage from  './Pages/AuthPage/LoginPage'
import SignupPage from  './Pages/AuthPage/SignupPage'
import { useEffect, useState } from "react"
import PostJob from "./Pages/PostJob/PostJob"
import MyProfile from "./Pages/MyProfile/MyProfile"
import MyPosts from "./Pages/MyPosts/MyPosts"



function App() {
  // const { token } = useSelector((state)=>state.auth);
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')
  const [isToken, setIsToken] = useState(token);
          
      
  useEffect(() => {
    if (!isToken) {
      console.error("No access token found");
      return;
    }
    // Fetch freelancers with the access token
    fetch("http://localhost:8080/api/users/getCurrentUser", {
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
      })
      .then((data) => {
        localStorage.setItem('user', JSON.stringify(data))
        // console.log(data)
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, [token, user]);  // Dependency array includes token, so the effect runs when the token changes
  // console.log(jobs)


  return (
    <>
    <PageLayout>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/get-job" element={<GetJob />} />
      <Route path="/get-job/apply" element={<JobApplication />} />
      <Route path="/hire-job" element={<HireJob />} />
      <Route path="/post-job" element={<PostJob />} />
      <Route path="/profile" element={<MyProfile />} />
      <Route path="/my-posts" element={<MyPosts />} />
      <Route path="/:username" element={<FreelancerProfile />} />
    </Routes>
    </PageLayout>
    </>
  )
}

export default App
