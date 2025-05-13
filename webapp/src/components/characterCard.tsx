import { Box, Card, Image, Text, Button } from "@chakra-ui/react";

export interface CharacterData {
    id: string;
    name: string;
    species: string;
    status: string;
    image: string;
}

export const CharacterCard = ({ character }: { character: CharacterData }) => {
    return (
        <Card.Root maxW="200px" m={4} overflow="hidden">
            <Image
                src={character.image}
                alt={character.name}
                width="100%"
                height="100%"
            />
            <Card.Body gap="2" p={2}>
                <Card.Title>{character.name}</Card.Title>
                {/* <Card.Description>
                    {character.status}
                </Card.Description>
                <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                    {character.species}
                </Text> */}
            </Card.Body>
            {/* <Card.Footer gap="2">
                <Button variant="solid">Buy now</Button>
                <Button variant="ghost">Add to cart</Button>
            </Card.Footer> */}
            </Card.Root>
    );
};