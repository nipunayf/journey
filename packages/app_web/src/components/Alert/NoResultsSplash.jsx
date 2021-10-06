import {Box, Button, Flex, Stack, Text, useBreakpointValue, VStack} from "@chakra-ui/react";


export default function NoResultsSplash({message}) {
    return(
        <Flex
            w={'full'}
            h={'100vh'}
            backgroundImage={'no-results.png'}
            backgroundSize={'cover'}
            backgroundPosition={'center center'}>
            <VStack
                w={'full'}
                pt={'10%'}
                px={useBreakpointValue({base: 4, md: 8})}
                bgGradient={'linear(to-r, blackAlpha.400, transparent)'}>
                <Text
                    color={'primary.light'}
                    fontWeight={900}
                    bg={'rgb(0,0,0,0.4)'}
                    lineHeight={1.6}
                    p={4}
                    align={'center'}
                    fontSize={useBreakpointValue({base: '4xl', md: '5xl'})}>
                    Uh Oh! We couldn't find anything
                    <Text
                        color={'primary.dark'}
                        fontWeight={900}
                        fontSize={useBreakpointValue({base: '2xl', md: '3xl'})}>
                        {message}
                    </Text>
                </Text>
            </VStack>
        </Flex>
    );
}
