import { Box, Card, Image, Badge, HStack } from "@chakra-ui/react";

export interface EpisodeData {
    id: string;
    name: string;
    episode: string;
    air_date: string;
}

export const EpisodeCard = ({ episode }: { episode: EpisodeData }) => {
    return (
        <Card.Root flexDirection="row" overflow="hidden" maxW="xl" m={4}>
            <Box>
                <Card.Body p="2">
                    <Card.Title mb="2">{episode.name}</Card.Title>
                    <Card.Description>
                        {episode.episode}
                    </Card.Description>
                    <HStack mt="4">
                        <Badge px="2" py="1">{episode.air_date}</Badge>
                    </HStack>
                </Card.Body>
            </Box>
        </Card.Root>
    );
};