"use client";

import { UserContext, UserContextType } from "@/context/UserContext";
import { Box, Heading } from "@chakra-ui/react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Tabs } from "@chakra-ui/react"
import { CharactersList } from "@/components/CharactersList";
import { LocationsList } from "@/components/locationsList";
import { EpisodesList } from "@/components/episodesList";

type UserState = {
  characters: { page: number };
  locations: { page: number };
  episodes: { page: number };
  currentType: string;
};

export default function Explore() {
  const router = useRouter();
  const { username, jobTitle } = useContext<UserContextType>(UserContext);

  const searchParams = useSearchParams();
  const hashedParam = searchParams?.get("q") ?? "";

  // Retaining the user state in URL for continuity
  if (!username || !jobTitle) {
    redirect(`/auth?q=${hashedParam}`);
  }

  
  const decodedParam = atob(decodeURIComponent(hashedParam));
  const userState: UserState = decodedParam ? JSON.parse(decodedParam) : null;

  const [charactersPage, setCharactersPage] = useState<number>(userState?.characters?.page ?? 1);
  const [locationsPage, setLocationsPage] = useState<number>(userState?.locations?.page ?? 1);
  const [episodesPage, setEpisodesPage] = useState<number>(userState?.episodes?.page ?? 1);
  const [type, setType] = useState<string>(userState?.currentType ?? 'characters');

  console.log("currentType", type);

  useEffect(() => {
    const hashedParam = encodeURIComponent(btoa(JSON.stringify({
      characters: { page: Number(charactersPage) },
      locations: { page: Number(locationsPage) },
      episodes: { page: Number(episodesPage) },
      currentType: type
    })));
    console.log("changing url to ", hashedParam);
    router.push(`/explore?q=${hashedParam}`);
  }, [charactersPage, locationsPage, episodesPage, type, router]);

  const triggerTabChange = (value: string) => {
    setType(value);
  };

  return (
    <Box p={4} maxW="1200px" mx="auto">
      <Heading size="2xl" mb={6} p={4} textAlign="center">Explore the Rick and Morty Universe</Heading>
      <div>
        <Tabs.Root defaultValue={type} onValueChange={(e) => triggerTabChange(e.value)}>
          <Tabs.List>
            <Tabs.Trigger value="characters">
              <Box p={2} mx={2} fontSize="xl">Characters</Box>
            </Tabs.Trigger>
            <Tabs.Trigger value="locations">
              <Box p={2} mx={2} fontSize="xl">Locations</Box>
            </Tabs.Trigger>
            <Tabs.Trigger value="episodes">
              <Box p={2} mx={2} fontSize="xl">Episodes</Box>
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="characters">
            <CharactersList charactersPage={charactersPage} changeCharacterPage={setCharactersPage} />
          </Tabs.Content>
          <Tabs.Content value="locations">
            <LocationsList locationsPage={locationsPage} changeLocationPage={setLocationsPage} />
          </Tabs.Content>
          <Tabs.Content value="episodes">
            <EpisodesList episodesPage={episodesPage} changeEpisodePage={setEpisodesPage} />
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </Box>
  );
} 