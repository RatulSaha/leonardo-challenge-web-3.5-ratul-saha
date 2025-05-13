"use client";

import { GET_CHARACTERS } from "@/graphql/characters";
import { useQuery } from "@apollo/client";
import { Box, Text, ButtonGroup, IconButton, Pagination } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface CharactersListProps {
  page: number;
}

export const CharactersList = ({ page }: CharactersListProps) => {
    const { loading, error, data } = useQuery(GET_CHARACTERS, {
        variables: { page },
      });

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Sorry, something went wrong.</Text>;

    console.log("data", data);
    const { info, results } = data.characters;
    return (
        <Box>
            {/* The table */}
            <Box p={4} mt={4}>
                <Pagination.Root count={info.count} pageSize={10} defaultPage={page}>
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