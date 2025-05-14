import { Box, Heading, Input, Text, VStack, Button, FileUpload, Flex, Image, Fieldset, Field, NativeSelect, Textarea } from '@chakra-ui/react'
import React, { useState } from 'react'
import { HiUpload } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

const JobApplicationForm = ({setIsApplied}) => {
    const Navigate = useNavigate()
    // const countries = ["United States", "Canada", "United Kingdom", "India"];

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        country: "",
        position: "",
        coverLetter: "",
        resume: null,
        submited:false,
        workRef: ''
      });
    
      // Simple change handler
      const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "resume") {
          setFormData({ ...formData, resume: files[0] }); // handle file input
        } else {
          setFormData({ ...formData, [name]: value }); // handle text inputs
        }
      };
    
      // Simple submit handler
      const handleSubmit = (e) => {
        e.preventDefault();
        setFormData({ ...formData, submited:true });
        setIsApplied(true);
        Navigate('/get-job')
        
      };

    return (
        <VStack className=''>
          <Fieldset.Root size="lg" maxW="lg" mx="auto" p="6" boxShadow="md" borderRadius="xl">
            <VStack spacing="6">
              <VStack spacing="2">
                <Fieldset.Legend fontSize="2xl" fontWeight="bold" color={'black'}>
                  Job Application Form
                </Fieldset.Legend>
                <Fieldset.HelperText fontSize="sm">
                  Please fill out the form carefully to apply for the job.
                </Fieldset.HelperText>
              </VStack>
    
              <Fieldset.Content>
                {/* Full Name */}
                <Field.Root>
                  <Field.Label>Full Name</Field.Label>
                  <Input
                  background={'transparent'}
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    isRequired
                  />
                </Field.Root>
    
                {/* Email Address */}
                <Field.Root>
                  <Field.Label>Email Address</Field.Label>
                  <Input
                  background={'transparent'}
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    isRequired
                  />
                </Field.Root>
    
                {/* Phone Number */}
                <Field.Root>
                  <Field.Label>Phone Number</Field.Label>
                  <Input
                  background={'transparent'}
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    isRequired
                  />
                </Field.Root>
    
                {/* Country */}
                <Field.Root>
                  <Field.Label>Country</Field.Label>
                  <Input
                  background={'transparent'}
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Country name"
                    isRequired
                  />
                </Field.Root>
    
                {/* Position Applied For */}
                <Field.Root>
                  <Field.Label>Position Applied For</Field.Label>
                  <Input
                  background={'transparent'}
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    placeholder="Frontend Developer, UI/UX Designer, etc."
                    isRequired
                  />
                </Field.Root>

                {/* Sample work reference link */}
                <Field.Root>
                  <Field.Label>Sample Work</Field.Label>
                  <Input
                  background={'transparent'}
                    name="workRef"
                    value={formData.workRef}
                    onChange={handleChange}
                    placeholder="Sample work reference link..."
                    isRequired
                  />
                </Field.Root>
    
                {/* Cover Letter */}
                <Field.Root>
                  <Field.Label>Cover Letter</Field.Label>
                  <Textarea
                  background={'transparent'}
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    placeholder="Tell us why you're a great fit for this role..."
                    rows={5}
                    isRequired
                  />
                </Field.Root>
    
                {/* Resume Upload */}
                {/* <Field.Root>
                  <Field.Label>Upload Resume</Field.Label>
                  <Input
                    type="file"
                    name="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={handleChange}
                  />
                </Field.Root> */}
              </Fieldset.Content>
    
              <Button type="submit" colorScheme="teal" alignSelf="flex-start" backgroundColor={'blue.400'} onClick={handleSubmit}>
                Submit Application
              </Button>
            </VStack>
          </Fieldset.Root>
        </VStack>
      );
    
}

export default JobApplicationForm