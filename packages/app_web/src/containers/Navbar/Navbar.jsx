import {
    Avatar,
    Badge,
    Button,
    Flex,
    Grid,
    GridItem,
    HStack,
    IconButton,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    Link,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Portal,
    Text,
    VStack,
} from '@chakra-ui/react';
import {ArrowForwardIcon, BellIcon, RepeatClockIcon, Search2Icon, SettingsIcon} from '@chakra-ui/icons';
import {useHistory} from 'react-router-dom';
import * as actions from '../../store/actions';
import {connect} from "react-redux";
import NoResults from "../../components/Alert/NoResults";

const NotificationPopover = () => {
    return (
        <HStack spacing={-3}>
            <Popover>
                <PopoverTrigger>
                    <IconButton icon={<BellIcon boxSize={6}/>} color="secondary.light" bg={'primary.main'}/>
                </PopoverTrigger>
                <Portal>
                    <PopoverContent w={'100%'}>
                        <PopoverArrow/>
                        <PopoverHeader fontWeight={600}>Notifications</PopoverHeader>
                        <PopoverCloseButton/>
                        <PopoverBody align="center">
                            <VStack w="100%" spacing={3} h="270px" overflowY={'auto'}>
                                <NoResults message={'There are no any notifications'}/>
                            </VStack>
                        </PopoverBody>
                    </PopoverContent>
                </Portal>
            </Popover>
            {/*<Badge borderRadius="lg" variant="solid" colorScheme="red" zIndex={1}> 2 </Badge>*/}
        </HStack>
    );
}

const UserAvatar = ({firstName, lastName, logout, profilePic}) => {
    const history = useHistory();

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
                        <Text fontSize={14} noOfLines={1} isTrucated w={16}>{firstName}</Text>
                        <Avatar height={10} width={10} size={'sm'} name={`${firstName} ${lastName}`} src={profilePic}/>
                    </HStack>
                </MenuButton>
                <MenuList>
                    <Text color={'black'} noOfLines={1} isTruncated w={'90%'}>{`${firstName} ${lastName}`}</Text>
                    <MenuDivider/>
                    <MenuItem color={'black'} icon={<SettingsIcon/>} onClick={() => {
                        history.push('/settings')
                    }}>Settings</MenuItem>
                    <MenuItem color={'black'} icon={<RepeatClockIcon/>} onClick={() => {
                        history.push('/history')
                    }}>My Itineraries</MenuItem>
                    <MenuDivider/>
                    <MenuItem color={'black'} icon={<ArrowForwardIcon/>} onClick={logout}>Sign Out</MenuItem>
                </MenuList>
            </Menu>
        </Flex>
    );
}

function Navbar({isAuthenticated, onLogout, firstName, lastName, profilePic}) {
    const history = useHistory();

    return <Grid templateColumns="repeat(12, 1fr)" bg="primary.main" w="100%" gap={2} align="center" py={2} px={1}
                 borderBottomRadius="2rem" position="fixed" top={0} zIndex={1} opacity={0.9}>
        <GridItem colSpan={3}>
            <Image
                src='./journey-logo.png'
                w={120}
                h={55}
                onClick={() => {
                    history.push('/')
                }}/>
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
                <><GridItem colStart={11} colEnd={12} pt={1.5} justifySelf={'center'}>
                    <NotificationPopover />
                </GridItem>
                    <GridItem colStart={12} colEnd={14} color="white" alignItems={'center'} pt={1.5}>
                        <UserAvatar firstName={firstName} lastName={lastName} logout={onLogout} profilePic={profilePic}/>
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
        isAuthenticated: state.auth.token !== null,
        firstName: state.profile.firstName,
        lastName: state.profile.lastName,
        profilePic: state.profile.profilePic
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
