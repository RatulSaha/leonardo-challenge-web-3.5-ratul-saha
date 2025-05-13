import { Box, Card, Image, Badge, HStack } from "@chakra-ui/react";

export interface CharacterData {
    id: string;
    name: string;
    species: string;
    status: string;
    image: string;
}

export const CharacterCard = ({ character }: { character: CharacterData }) => {
    return (
        <Card.Root flexDirection="row" overflow="hidden" maxW="xl" m={4}>
            <Image
            objectFit="cover"
            maxW="150px"
            src={character.image}
            alt={character.name}
            />
            <Box>
                <Card.Body p="2">
                    <Card.Title mb="2">{character.name}</Card.Title>
                    <Card.Description>
                        {character.species}
                    </Card.Description>
                    <HStack mt="4">
                        <Badge px="2" py="1">{character.status}</Badge>
                    </HStack>
                </Card.Body>
            </Box>
        </Card.Root>
    );
};