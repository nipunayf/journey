import {
    Avatar,
    Button,
    Flex,
    Grid,
    GridItem,
    HStack,
    IconButton,
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
import SearchBar from "./SearchBar";

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
                    data-cy={'avatar'}
                    minW={0}>
                    <HStack>
                        <Text fontSize={14} noOfLines={1} isTrucated w={16}>{firstName}</Text>
                        <Avatar height={10} width={10} size={'sm'} name={`${firstName} ${lastName}`} src={profilePic}/>
                    </HStack>
                </MenuButton>
                <MenuList>
                    <Text color={'black'} noOfLines={1} isTruncated w={'90%'}>{`${firstName} ${lastName}`}</Text>
                    <MenuDivider/>
                    <MenuItem color={'black'} icon={<SettingsIcon/>} data-cy={'settings'} onClick={() => {
                        history.push('/settings')
                    }}>Settings</MenuItem>
                    <MenuItem color={'black'} icon={<RepeatClockIcon/>} data-cy={'myItineraries'} onClick={() => {
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
            <Button bgImage={'url(./journey-logo.png)'}
                    bgSize={120}
                    bgRepeat="no-repeat"
                    bgColor={'primary.main'}
                    w={120}
                    h={55}
                    _hover={{color: 'primary.dark', opacity: 0.4}}
                    onClick={() => {
                        history.push('/')
                    }}/>
        </GridItem>
        <GridItem colStart={5} colEnd={9}>
            <SearchBar />
        </GridItem>
        {
            isAuthenticated ?
                <><GridItem colStart={11} colEnd={12} pt={1.5} justifySelf={'center'}>
                    <NotificationPopover/>
                </GridItem>
                    <GridItem colStart={12} colEnd={14} color="white" alignItems={'center'} pt={1.5}>
                        <UserAvatar firstName={firstName} lastName={lastName} logout={onLogout}
                                    profilePic={profilePic}/>
                    </GridItem></> :
                <GridItem colStart={12} colEnd={14} color="white" alignItems={'center'} pt={1.5}>
                    <Button
                        onClick={() => {
                            history.push('/login')
                        }}
                        data-cy={'signin'}
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
        isAuthenticated: state.auth.isAuthenticated,
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
