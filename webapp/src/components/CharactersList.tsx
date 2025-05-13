"use client";

import { GET_CHARACTERS } from "@/graphql/characters";
import { useQuery } from "@apollo/client";
import { Box, Text, ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { CharacterCard } from "./characterCard";
import { useState } from "react";

interface CharactersListProps {
    charactersPage: number;
    changeCharacterPage: (page: number) => void;
}

export const CharactersList = ({ charactersPage, changeCharacterPage }: CharactersListProps) => {
    const { loading, error, data } = useQuery(GET_CHARACTERS, {
        variables: { page: charactersPage },
      });

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Sorry, something went wrong.</Text>;

    console.log("data", data);
    const { info, results } = data.characters;
    return (
        <Box>
            <Box p={4} mt={4} display="flex" flexWrap="wrap" justifyContent="flex-start">
                {results.map((character: any) => (
                    <CharacterCard character={character} />
                ))}
            </Box>
            <Box p={4} mt={4}>
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
        </Box>
    );
}; 