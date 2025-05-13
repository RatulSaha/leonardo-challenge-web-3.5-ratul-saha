"use client";

import { GET_EPISODES } from "@/graphql/episodes";
import { useQuery } from "@apollo/client";
import { Box, Text, ButtonGroup, IconButton, Pagination, Grid } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { EpisodeCard, EpisodeData } from "./episodeCard";

interface EpisodesListProps {
    episodesPage: number;
    changeEpisodePage: (page: number) => void;
}

export const EpisodesList = ({ episodesPage, changeEpisodePage }: EpisodesListProps) => {
    const { loading, error, data } = useQuery(GET_EPISODES, {
        variables: { page: episodesPage },
    });

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Sorry, something went wrong.</Text>;

    const { info, results } = data.episodes;
    return (
        <Box>
            <Grid 
                templateColumns={{
                    base: "1fr",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(4, 1fr)",
                }} 
                gap={1}
            >
                {results.map((episode: EpisodeData) => (
                    <EpisodeCard key={episode.id} episode={episode} />
                ))}
            </Grid>
            <Box mt={4} display="flex" justifyContent="center">
                <Pagination.Root count={info.count} pageSize={20} defaultPage={episodesPage} onPageChange={(data) => changeEpisodePage(data.page)}>
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