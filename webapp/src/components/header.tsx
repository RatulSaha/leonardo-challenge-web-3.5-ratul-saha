import { FormLabel } from "@chakra-ui/form-control";
import { Box, Button, Image, Input, Link, Popover, Portal, VStack } from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { FormControl } from "@chakra-ui/form-control";
import { useRef } from "react";
import { getAuthFromLocalStorage, setAuthInLocalStorage } from "@/lib/authFromLocalStorage";

export const Header = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const jobTitleRef = useRef<HTMLInputElement>(null);
  const { username, jobTitle } = getAuthFromLocalStorage();

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

  return (
    <Box p={4} maxW="1200px" mx="auto" display="flex" justifyContent="space-between" alignItems="center" flexDirection={"column"}>
        <Link href="/">
            <Image
                src="/logo.png"
                alt="Rick and Morty World Logo"
                width={100}
                height={100}
                mx="auto"
                display="block"
            />
        </Link>
        {username && jobTitle && (
          <Popover.Root>
            <Popover.Trigger asChild>
                <Button size="sm" variant="outline">
                  Your profile
                </Button>
            </Popover.Trigger>
            <Portal>
                <Popover.Positioner>
                <Popover.Content>
                    <Popover.Arrow />
                    <Popover.Body>
                    <Popover.Title fontWeight="bold" p="4">Edit your profile</Popover.Title>
                    <Toaster />
                    <VStack gap={6}>
                        <FormControl>
                            <FormLabel fontSize="sm">update your username</FormLabel>
                            <Input ref={usernameRef} type="text" maxLength={32} placeholder={username} pattern="[a-zA-Z0-9]*" p={2} mt={2} />
                        </FormControl>
                        <FormControl>
                        <FormLabel fontSize="sm">Update you job title</FormLabel>
                        <Input ref={jobTitleRef} type="text" maxLength={32} placeholder={jobTitle} p={2} mt={2} />
                        </FormControl>
                        <Button colorScheme="blue" width="full" onClick={handleSubmit}>Submit</Button>
                    </VStack>
                    </Popover.Body>
                </Popover.Content>
                </Popover.Positioner>
            </Portal>
          </Popover.Root>
        )}
    </Box>
  );
};