import {
    Stack,
    Flex,
    Button,
    Text,
    VStack,
    useBreakpointValue, SimpleGrid,
} from '@chakra-ui/react';

export default function Hero() {
    return (
        <Flex
            w={'full'}
            h={'100vh'}
            backgroundImage={'home-bg.jpg'}
            backgroundSize={'cover'}
            backgroundPosition={'center center'}>
            <VStack
                w={'full'}
                justify={'center'}
                px={useBreakpointValue({base: 4, md: 8})}
                bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
                <Stack maxW={'2xl'} align={'center'} spacing={6} bg="rgba(0,0,0,0.6)" px={5} py={5}>
                    <Text
                        color={'primary.main'}
                        fontWeight={900}
                        lineHeight={1.6}
                        align={'center'}
                        fontSize={useBreakpointValue({base: '4xl', md: '5xl'})}>
                        A Smart Travel Planner
                        <Text
                            color={'secondary.light'}
                            fontWeight={900}
                            fontSize={useBreakpointValue({base: '4xl', md: '5xl'})}>
                            for Your Liking
                        </Text>
                    </Text>
                    <Text
                        color={'primary.main'}
                        fontWeight={700}
                        lineHeight={1.2}
                        fontSize={useBreakpointValue({base: 'md', md: 'xl'})}>
                        Don't have an account? Start creating your own itinerary now!
                    </Text>
                    <Button
                        bg={'secondary.main'}
                        rounded={'full'}
                        color={'white'}
                        _hover={{bg: 'blue.500'}}>
                        Register Now
                    </Button>
                </Stack>
            </VStack>
        </Flex>
    );
}
