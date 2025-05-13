"use client";

import { GET_CHARACTERS } from "@/graphql/characters";
import { useQuery } from "@apollo/client";
import { Box, Text, ButtonGroup, IconButton, Pagination, Grid } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { CharacterCard, CharacterData } from "./characterCard";
import { useState } from "react";
import { CharacterModal } from "./characterModal";

interface CharactersListProps {
    charactersPage: number;
    changeCharacterPage: (page: number) => void;
}

export const CharactersList = ({ charactersPage, changeCharacterPage }: CharactersListProps) => {
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    
    const { loading, error, data } = useQuery(GET_CHARACTERS, {
        variables: { page: charactersPage },
    });

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Sorry, something went wrong.</Text>;

    const { info, results } = data.characters;
    return (
        <Box>
            <Grid 
                templateColumns={{
                    base: "1fr",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                }} 
                gap={1}
            >
                {results.map((character: CharacterData) => (
                    <Box 
                        onClick={() => setSelectedItemId(character.id)}
                        cursor="pointer"
                        _hover={{ transform: 'scale(1.02)', transition: 'transform 0.2s' }}
                    >
                        <CharacterCard key={character.id} character={character} />
                    </Box>
                ))}
            </Grid>
            <Box mt={4} display="flex" justifyContent="center">
                <Pagination.Root count={info.count} pageSize={20} defaultPage={charactersPage} onPageChange={(data) => changeCharacterPage(data.page)}>
                    <ButtonGroup variant="ghost" size="sm">
                        <Pagination.PrevTrigger asChild>
                            <IconButton>
                                <LuChevronLeft />
                            </IconButton>
                        </Pagination.PrevTrigger>

                        <Pagination.Items
                            render={(page) => (
                                <IconButton variant={{ base: "outline", _selected: "solid" }}>
                                    {page.value}
                                </IconButton>
                            )}
                        />

                        <Pagination.NextTrigger asChild>
                            <IconButton>
                                <LuChevronRight />
                            </IconButton>
                        </Pagination.NextTrigger>
                    </ButtonGroup>
                </Pagination.Root>
            </Box>
            <CharacterModal selectedItemId={selectedItemId} />
        </Box>
    );
}; 