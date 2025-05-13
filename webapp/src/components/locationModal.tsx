
import { GET_LOCATION } from "@/graphql/locations";
import { Badge, Box, Card, CloseButton, Dialog, Portal, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { apolloClient } from "@/context/apolloContext";

type FullLocationData = {
    id: string;
    name: string;
    type: string;
    dimension: string;
    residents: {
        id: string;
        name: string;
    }[];
    created: string;
}

export const LocationModal = ({ selectedItemId, setSelectedItemId }: { selectedItemId: string | null, setSelectedItemId: (id: string | null) => void }) => {
    const [open, setOpen] = useState(false);
    const [location, setLocation] = useState<FullLocationData | null>(null);
    useEffect(() => {
        if (selectedItemId) {
            setOpen(true);
            apolloClient.query({
                query: GET_LOCATION,
                variables: { id: selectedItemId },
            }).then((result) => {
                const location = result.data.location;
                setLocation(location);
            });
        }
    }, [selectedItemId]);

    return (
        <Dialog.Root lazyMount open={open} onOpenChange={(e) => setOpen(e.open)} placement="center" onExitComplete={() => setSelectedItemId(null)}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                <Dialog.Content p={4}>
                    <Dialog.Header>
                    <Dialog.Title>{location?.name || "Loading..."}</Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                        {location &&
                        <Card.Root flexDirection="row" overflow="hidden" maxW="xl" mt={2} border="none">
                            <Box>
                                <Card.Body p="2">
                                    <VStack ml={2} alignItems="flex-start">
                                        <Box>Type: {location.type}</Box>
                                        <Box>Dimension: {location.dimension}</Box>
                                        <Box>Created: {new Date(location.created).toLocaleString()}</Box>
                                        <Box>Residents: {location.residents.length === 0 && "No residents."}</Box>
                                        {/* TODO: Improve for the case when a location has  too many residents */}
                                        <VStack alignItems="flex-start">
                                            
                                            {location.residents.map((resident) => (
                                                <Badge key={resident.id} px="2" py="1">{resident.name}</Badge>
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