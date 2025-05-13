import { Box, Image, Link } from "@chakra-ui/react";

export const Header = () => {
  return (
    <Box p={4} maxW="1200px" mx="auto">
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
    </Box>
  );
};