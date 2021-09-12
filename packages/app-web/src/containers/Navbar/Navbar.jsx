import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack, Image, Input, InputLeftElement, InputGroup, GridItem, Grid,
} from '@chakra-ui/react';
import {HamburgerIcon, CloseIcon, Search2Icon} from '@chakra-ui/icons';
import AutoComplete from "../../components/Autocomplete";

const UserAvatar = () => {
    return (
        <Flex alignItems={'center'}>
            <Menu>
                <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}>
                    <Avatar
                        size={'sm'}
                        src={
                            'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                        }
                    />
                </MenuButton>
                <MenuList>
                    <MenuItem>Link 1</MenuItem>
                    <MenuItem>Link 2</MenuItem>
                    <MenuDivider/>
                    <MenuItem>Link 3</MenuItem>
                </MenuList>
            </Menu>
        </Flex>
    );
}

export default function Navbar() {

    return (
        <Grid templateColumns="repeat(12, 1fr)" bg="primary.main" w="100%" gap={2} align="center" py={2} px={1}
              borderBottomRadius="2rem" position="fixed" top={0} zIndex={1} opacity={0.9}>
            <GridItem colSpan={3}>
                <Image
                    src='./journey-logo.png'
                    w={120}
                    h={55}
                />
            </GridItem>
            <GridItem colStart={5} colEnd={9}>
                <AutoComplete/>
                {/*<InputGroup pt={1}>*/}
                {/*    <InputLeftElement*/}
                {/*        pointerEvents="none"*/}
                {/*        children={<Search2Icon color="white.100"/>}*/}
                {/*        pt={2}*/}
                {/*    />*/}
                {/*    <Input*/}
                {/*        type="search"*/}
                {/*        placeholder="Search Destinations"*/}
                {/*        isRequired*/}
                {/*        // onChange={((e) => {setKeyword(e.target.value)}).bind(this)}*/}
                {/*        // value={keyword}*/}
                {/*        // onKeyPress={((e) => {if (e.key === 'Enter' && keyword.length !== 0) {history.push(`/search/${keyword}`, { keyword: keyword }); setKeyword('')}}).bind(this)}*/}
                {/*    />*/}
                {/*    <IconButton*/}
                {/*        icon={<Search2Icon/>}*/}
                {/*        // onClick={() => { if (keyword.length !== 0) {history.push(`/search/${keyword}`, { keyword: keyword }); setKeyword('')} }}*/}
                {/*        bg="secondary.light"*/}
                {/*        color="white"/>*/}
                {/*    <Link/>*/}
                {/*</InputGroup>*/}
            </GridItem>
            <GridItem colStart={11} colEnd={13} color="white" alignItems={'center'}>
                <Button
                    bg={'secondary.light'}
                    rounded={'full'}
                    color={'white'}
                    _hover={{bg: 'blue.500'}}>
                    Sign In
                </Button>
            </GridItem>
        </Grid>
    );
}
