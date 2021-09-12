import React from "react";
import {Badge, Box, Button, Flex, Image, Spacer, Stack, Text, useColorMode} from "@chakra-ui/react";

export default function DashboardCard() {

    return (
        <div>
            <Box w="300px" rounded="20px" overflow="hidden" bg="gray.200" mt={10}>
                <Image src="https://uploads-ssl.webflow.com/576fd5a8f192527e50a4b95c/5e7a3ee81de2791e72d27361_nine%20arch%20bridge%20ella.jpg" alt="Card Image" boxSize="300px"/>
                <Box p={5}>
                    <Stack align="center">
                        <Badge variant="solid" colorScheme="green"
                               rounded="full" px={2}>
                            Nine Arch Bridge
                        </Badge>
                    </Stack>
                    <Flex>
                        <Spacer/>
                        <Button align="center" variant="solid"
                                colorScheme="green" size="sm">
                            Create Itinerary
                        </Button>
                    </Flex>
                </Box>
            </Box>
        </div>
    );
}
