import {
    Heading,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Link,
    Select, SimpleGrid,
    Spacer,
    VStack
} from "@chakra-ui/react";
import {Search2Icon} from "@chakra-ui/icons";
import DatePicker from "react-datepicker";

import 'react-datepicker/dist/react-datepicker.css';
import '../components/Destination/datepicker.css';
import {useState} from "react";
import Navbar from "../containers/Navbar/Navbar";
import ItineraryCard from "../components/Itinerary/Itinerary";

function SearchBar() {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    return (
        <HStack w={'80%'} h={65} borderWidth="1px" borderRadius="lg" boxShadow={'lg'} p={4}>
            <InputGroup pt={1} w={'40%'}>
                <InputLeftElement
                    pointerEvents="none"
                    children={<Search2Icon color="white.100"/>}
                    pt={2}
                />
                <Input
                    type="search"
                    placeholder="Search Itineraries"
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
            <Spacer/>
            <HStack>
                <Heading size={14}>Range:</Heading>
                <DatePicker
                    w={300}
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => {
                        setDateRange(update);
                    }}
                    isClearable={true}
                />
            </HStack>
            <Spacer/>
            <HStack><Heading size={14}>State:</Heading>
                <Select placeholder="State" w={36}>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                </Select>
            </HStack>
        </HStack>
    );
}

function ItineraryContainer() {
    return(
        <SimpleGrid columns={{sm: 1, md: 2, lg: 3}} spacing="40px">
            <ItineraryCard/>
            <ItineraryCard/>
            <ItineraryCard/>
            <ItineraryCard/>
        </SimpleGrid>
    );
}

export default function MyItineraries() {
    return (<>
        <Navbar />
        <VStack pt={20} align={'center'} w={'100%'} spacing={8} pb={5}>
            <SearchBar/>
            <ItineraryContainer />
        </VStack>
    </>);
}
