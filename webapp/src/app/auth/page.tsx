"use client";

import { Box, Button, Heading, Input, VStack } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useRef } from "react";
import { getAuthFromLocalStorage, setAuthInLocalStorage } from "@/lib/authFromLocalStorage";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";

export default function Auth() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const jobTitleRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const username = usernameRef.current?.value;
    const jobTitle = jobTitleRef.current?.value;
    if (username && jobTitle) {
      setAuthInLocalStorage(username, jobTitle);
    } else {
      toaster.create({
        title: "Error",
        description: "Please fill in both the username and job title.",
        type: "error",
      });
    }
  };

  const navigate = useRouter();
  const { username, jobTitle } = getAuthFromLocalStorage();

  if (username && jobTitle) {
    navigate.push('/explore');
  };

  return (
    <Box p={4} maxW="400px" mx="auto" mt={8}>
      <Toaster />
      <VStack gap={6}>
        <Heading size="lg">Enter your details</Heading>
        <FormControl>
          <FormLabel fontSize="sm">Choose a username</FormLabel>
          <Input ref={usernameRef} type="text" maxLength={32} placeholder="username" pattern="[a-zA-Z0-9]*" p={2} mt={2} />
        </FormControl>
        <FormControl>
          <FormLabel fontSize="sm">Job title</FormLabel>
          <Input ref={jobTitleRef} type="text" maxLength={32} placeholder="Your job title" p={2} mt={2} />
        </FormControl>
        <Button colorScheme="blue" width="full" onClick={handleSubmit}>Submit</Button>
      </VStack>
    </Box>
  );
}