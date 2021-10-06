import {Flex, Stack, Text} from "@chakra-ui/react";

export default function Feature ({ title, text, icon }) {
    return (
        <Stack>
            <Flex
                w={16}
                h={16}
                align={'center'}
                justify={'center'}
                color={'white'}
                rounded={'full'}
                bg={'gray.100'}
                mb={1}>
                {icon}
            </Flex>
            <Text fontWeight={600} fontSize={20}>{title}</Text>
            <Text color={'gray.600'} fontSize={18}>{text}</Text>
        </Stack>
    );
};
