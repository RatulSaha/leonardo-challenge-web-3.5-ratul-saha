"use client";

import { GET_EPISODE } from "@/graphql/episodes";
import { Badge, Box, Card, CloseButton, Dialog, HStack, Portal, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { apolloClient } from "@/context/apolloContext";

type FullEpisodeData = {
    id: string;
    name: string;
    episode: string;
    air_date: string;
    characters: {
        id: string;
        name: string;
    }[];
    created: string;
}

export const EpisodeModal = ({ selectedItemId }: { selectedItemId: string | null }) => {
    const [open, setOpen] = useState(false);
    const [episode, setEpisode] = useState<FullEpisodeData | null>(null);
    useEffect(() => {
        if (selectedItemId) {
            setOpen(true);
            apolloClient.query({
                query: GET_EPISODE,
                variables: { id: selectedItemId },
            }).then((result) => {
                const episode = result.data.episode;
                setEpisode(episode);
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
                    <Dialog.Title>{episode?.name || "Loading..."}</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                        {episode &&
                        <Card.Root flexDirection="row" overflow="hidden" maxW="xl" mt={2} border="none">
                            <Box>
                                <Card.Body p="2">
                                    <VStack ml={2} alignItems="flex-start">
                                        <Box>Episode: {episode.episode}</Box>
                                        <Box>Air Date: {episode.air_date}</Box>
                                        <Box>Created: {new Date(episode.created).toLocaleString()}</Box>
                                        <Box>Characters: {episode.characters.length === 0 && "No characters."}</Box>
                                        {/* TODO: Improve for the case when a episode has  too many characters */}
                                        <Box display="flex" alignItems="flex-start" flexWrap="wrap">
                                            {episode.characters.map((character) => (
                                                <Badge key={character.id} px="2" py="1" m={1}>{character.name}</Badge>
                                            ))}
                                        </Box>
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