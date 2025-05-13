import { Box, Card, Badge, HStack } from "@chakra-ui/react";

export interface LocationData {
    id: string;
    name: string;
    type: string;
    dimension: string;
}

export const LocationCard = ({ location }: { location: LocationData }) => {
    return (
        <Card.Root flexDirection="row" overflow="hidden" maxW="xl" m={4}>
            <Box>
                <Card.Body p="2">
                    <Card.Title mb="2">{location.name}</Card.Title>
                    <Card.Description>
                        {location.type}
                    </Card.Description>
                    <HStack mt="4">
                        <Badge px="2" py="1">{location.dimension}</Badge>
                    </HStack>
                </Card.Body>
            </Box>
        </Card.Root>
    );
};