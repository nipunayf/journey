import React from "react";
import {Badge, Box, Button, Image, Stack, Text} from "@chakra-ui/react";

export default function DashboardCard() {

    return (
        <Box
            w='400px'
            rounded='20px'
            overflow='hidden'
            boxShadow={"sm"}
            bg={'grey.200'}>
            <Image src={'https://www.dailynews.lk/sites/default/files/news/2021/05/20/Port-City.jpg'} alt='Port city'/>
            <Box p={5}>
                <Stack isInline align={"baseline"}>
                    <Badge variant={"solid"} rounded={"full"} px={2}>Colombo</Badge>
                    <Badge variant={"solid"} rounded={"full"} px={2}>Attractive</Badge>
                </Stack>
                <Text as={'h2'} fontWeight={"semibold"} fontSize={"xl"} my={2}>Port City</Text>
                <Text isTruncated fontWeight={"light"} fontSize={"md"}>
                    Colombo International Financial City <br/>is a special economic zone and<br/> International Financial Centre
                    located in <br/>Colombo, Sri Lanka, which is currently under construction on reclaimed land adjacent to the Galle Face Green.
                    The land reclamation work had been completed as of January 2018.
                </Text>
                <Box textAlign={"center"}>
                    <Button variantColor={'teal'} size={'lg'} boxShadow={'sm'} _hover={{boxShadow: 'md'}}
                            _active={{boxShadow: 'lg'}}>Create Itinerary
                    </Button>
                </Box>
            </Box>
        </Box>

    );
}
