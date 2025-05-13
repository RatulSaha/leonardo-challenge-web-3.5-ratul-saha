"use client";

import { UserContext, UserContextType } from "@/context/UserContext";
import { Box, Heading } from "@chakra-ui/react";
import { redirect } from "next/navigation";
import { useContext } from "react";

export default function Explore() {
  // @TODO: This could be improved and taken out if there are more pages and we want to redirect to the login page for accessing all of them.
  const { username, jobTitle } = useContext<UserContextType>(UserContext);
  if (!username || !jobTitle) {
    redirect("/auth");
  }
  return (
    <Box p={4} maxW="1200px" mx="auto">
      <Heading size="xl" mb={6}>Explore (dummy page)</Heading>
    </Box>
  );
} 