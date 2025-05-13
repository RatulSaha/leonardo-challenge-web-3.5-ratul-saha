"use client";

import { GET_LOCATIONS } from "@/graphql/locations";
import { useQuery } from "@apollo/client";
import { Box, Text, ButtonGroup, IconButton, Pagination, Grid } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { LocationCard, LocationData } from "./locationCard";
import { useState } from "react";
import { LocationModal } from "./locationModal";
import { SkeletonCardLocation } from "./skeletonCard";

interface LocationsListProps {
    locationsPage: number;
    changeLocationPage: (page: number) => void;
}

export const LocationsList = ({ locationsPage, changeLocationPage }: LocationsListProps) => {
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const { loading, error, data } = useQuery(GET_LOCATIONS, {
        variables: { page: locationsPage },
    });

    if (loading) return (
        <Grid 
            templateColumns={{
                base: "1fr",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
            }} 
            gap={1}
        >
            {[...Array(20)].map((_, index) => (
                <Box key={index}>
                    <SkeletonCardLocation />
                </Box>
            ))}
        </Grid>
    );
    if (error) return <Text>Sorry, something went wrong.</Text>;

    const { info, results } = data.locations;
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
                {results.map((location: LocationData) => (
                    <Box 
                        onClick={() => setSelectedItemId(location.id)}
                        key={location.id}
                        cursor="pointer"
                        _hover={{ transform: 'scale(1.02)', transition: 'transform 0.2s' }}
                    >
                        <LocationCard key={location.id} location={location} />
                    </Box>
                ))}
            </Grid>
            <Box mt={4} display="flex" justifyContent="center">
                <Pagination.Root count={info.count} pageSize={20} defaultPage={locationsPage} onPageChange={(data) => changeLocationPage(data.page)}>
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
            <LocationModal selectedItemId={selectedItemId} setSelectedItemId={setSelectedItemId} />
        </Box>
    );
}; 