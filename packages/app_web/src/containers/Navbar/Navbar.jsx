import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    IconButton,
    Button,
    Menu,
    Icon,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack, Image, Input, InputLeftElement, InputGroup, GridItem, Grid, Text,
} from '@chakra-ui/react';
import {
    HamburgerIcon,
    CloseIcon,
    Search2Icon,
    BellIcon,
    SettingsIcon,
    RepeatClockIcon,
    ArrowForwardIcon
} from '@chakra-ui/icons';
import {useHistory} from 'react-router-dom';
import {connect} from "react-redux";
import * as actions from "../../store/actions";

const UserAvatar = ({name, logout, profilePic}) => {
    return (
        <Flex alignItems={'center'}>
            <Menu>
                <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}>
                    <HStack>
                        <Text fontSize={14}>{name.split(' ')[0]}</Text>
                        <Avatar height={10} width={10} size={'sm'} name={name} src={profilePic}/>
                    </HStack>
                </MenuButton>
                <MenuList>
                    <Text color={'black'}>{name}</Text>
                    <MenuDivider/>
                    <MenuItem color={'black'} icon={<SettingsIcon/>}>Settings</MenuItem>
                    <MenuItem color={'black'} icon={<RepeatClockIcon/>}>My Itineraries</MenuItem>
                    <MenuDivider/>
                    <MenuItem color={'black'} icon={<ArrowForwardIcon/>} onClick={logout}>Sign Out</MenuItem>
                </MenuList>
            </Menu>
        </Flex>
    );
}

function Navbar({isAuthenticated, onLogout, displayName, profilePic}) {
    const history = useHistory();

    return <Grid templateColumns="repeat(12, 1fr)" bg="primary.main" w="100%" gap={2} align="center" py={2} px={1}
                 borderBottomRadius="2rem" position="fixed" top={0} zIndex={1} opacity={0.9}>
        <GridItem colSpan={3}>
            <Image
                src='./journey-logo.png'
                w={120}
                h={55}
            />
        </GridItem>
        <GridItem colStart={5} colEnd={9}>
            <InputGroup pt={1}>
                <InputLeftElement
                    pointerEvents="none"
                    children={<Search2Icon color="white.100"/>}
                    pt={2}
                />
                <Input
                    type="search"
                    placeholder="Search Destinations"
                    isRequired
                    // onChange={((e) => {setKeyword(e.target.value)}).bind(this)}
                    // value={keyword}
                    // onKeyPress={((e) => {if (e.key === 'Enter' && keyword.length !== 0) {history.push(`/search/${keyword}`, { keyword: keyword }); setKeyword('')}}).bind(this)}
                />
                <IconButton
                    icon={<Search2Icon/>}
                    // onClick={() => { if (keyword.length !== 0) {history.push(`/search/${keyword}`, { keyword: keyword }); setKeyword('')} }}
                    bg="secondary.light"
                    color="white"/>
                <Link/>
            </InputGroup>
        </GridItem>
        {
            isAuthenticated ?
                <><GridItem colStart={11} colEnd={12} pt={1.5}>
                    <IconButton icon={<BellIcon boxSize={6}/>} color="secondary.light" bg={'primary.main'}/>
                </GridItem>
                    <GridItem colStart={12} colEnd={14} color="white" alignItems={'center'} pt={1.5}>
                        <UserAvatar name={displayName} logout={onLogout} profilePic={profilePic}/>
                    </GridItem></> :
                <GridItem colStart={12} colEnd={14} color="white" alignItems={'center'} pt={1.5}>
                    <Button
                        onClick={() => {
                            history.push('/login')
                        }}
                        bg={'secondary.light'}
                        rounded={'full'}
                        color={'white'}
                        _hover={{bg: 'blue.500'}}>
                        Sign In
                    </Button>
                </GridItem>
        }

    </Grid>;
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null,
        displayName: state.displayName,
        profilePic: state.profilePic
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
