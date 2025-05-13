
import { GET_CHARACTER } from "@/graphql/characters";
import { Badge, Box, Card, CloseButton, Dialog, HStack, Image, Portal, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { apolloClient } from "@/app/layout";

type FullCharacterData = {
    id: string;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
    };
    location: {
        name: string;
    };
    image: string;
    episode: {
        id: string;
        name: string;
    }[];
    created: string;
}

export const CharacterModal = ({ selectedItemId }: { selectedItemId: string | null }) => {
    const [open, setOpen] = useState(false);
    const [character, setCharacter] = useState<FullCharacterData | null>(null);
    useEffect(() => {
        if (selectedItemId) {
            console.log("selectedItemId", selectedItemId);
            setOpen(true);
            apolloClient.query({
                query: GET_CHARACTER,
                variables: { id: selectedItemId },
            }).then((result) => {
                const character = result.data.character;
                setCharacter(character);
                console.log(character);
            });
        }
    }, [selectedItemId]);

    return (
        <Dialog.Root lazyMount open={open} onOpenChange={(e) => setOpen(e.open)} placement="center">
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                <Dialog.Content p={4}>
                    <Dialog.Header>
                    <Dialog.Title>{character?.name || "Loading..."}</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                        
                        {character &&
                        <Card.Root flexDirection="row" overflow="hidden" maxW="xl" mt={2} border="none">
                            <Image
                            objectFit="cover"
                            maxW="150px"
                            src={character.image}
                            alt={character.name}
                            />
                            <Box>
                                <Card.Body p="2">
                                    <VStack ml={2} alignItems="flex-start">
                                        <Box>Status: {character.status}</Box>
                                        <Box>Species: {character.species}</Box>
                                        <Box>Gender: {character.gender}</Box>
                                        <Box>Origin: {character.origin.name}</Box>
                                        <Box>Location: {character.location.name}</Box>
                                        <Box>Created: {new Date(character.created).toLocaleString()}</Box>
                                        <Box>Episodes:</Box>
                                        {/* TODO: Improve for the case when a character is in too many episodes */}
                                        <VStack alignItems="flex-start">
                                            {character.episode.map((episode) => (
                                                <Badge key={episode.id} px="2" py="1">{episode.name}</Badge>
                                            ))}
                                        </VStack>
                                        
                                    </VStack>
                                </Card.Body>
                            </Box>
                        </Card.Root>
                        }
                    </Dialog.Body>
                    <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                    </Dialog.CloseTrigger>
                </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}