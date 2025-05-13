import { Badge, Box, Card, HStack, Skeleton, SkeletonText } from "@chakra-ui/react";

export const SkeletonCardCharacter = () => {
    return (
        <Card.Root flexDirection="row" overflow="hidden" maxW="xl" m={4}>
            <Skeleton w="120px" />
            <Box>
                <Card.Body p="2">
                    <Card.Title mb="2"><SkeletonText noOfLines={1} /></Card.Title>
                    <SkeletonText minW="150px" noOfLines={1} />
                    <HStack mt="4">
                        <SkeletonText mr="2" noOfLines={1} w="30px"/>
                        <SkeletonText noOfLines={1} w="30px"/>
                    </HStack>
                </Card.Body>
            </Box>
            
        </Card.Root>
        
    );
};

export const SkeletonCardEpisode = () => {
    return (
        <Card.Root flexDirection="row" overflow="hidden" maxW="xl" m={4}>
            <Box>
                <Card.Body p="2">
                    <Card.Title mb="2"><SkeletonText noOfLines={1} /></Card.Title>
                    <SkeletonText noOfLines={1} minW="150px"/>
                    <SkeletonText mr="2" mt="4" noOfLines={1} w="100px"/>
                </Card.Body>
            </Box>
        </Card.Root>
    );
};

export const SkeletonCardLocation = () => {
    return (
        <Card.Root flexDirection="row" overflow="hidden" maxW="xl" m={4}>
            <Skeleton w="120px" />
            <Box>
                <Card.Body p="2">
                    <Card.Title mb="2"><SkeletonText noOfLines={1} /></Card.Title>
                    <SkeletonText noOfLines={1} minW="150px"/>
                    <SkeletonText mr="2" mt="4" noOfLines={1} w="100px"/>
                </Card.Body>
            </Box>
        </Card.Root>
    );
};