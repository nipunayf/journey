import {
    Heading,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Link,
    Select,
    SimpleGrid,
    Spacer,
    VStack
} from "@chakra-ui/react";
import {Search2Icon} from "@chakra-ui/icons";
import DatePicker from "react-datepicker";

import 'react-datepicker/dist/react-datepicker.css';
import '../components/Destination/datepicker.css';
import React, {useState} from "react";
import Navbar from "../containers/Navbar/Navbar";
import NoResultsSplash from "../components/Alert/NoResultsSplash";
import {StateEnum} from "../utils/constants";
import {useFormik} from "formik";
import PlaceCard from "../containers/Search/PlaceCard";
import ItineraryCard from "../components/Itinerary/ItineraryCard";
import {connect} from "react-redux";

function SearchBar({cached, setResult}) {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const formik = useFormik({
        initialValues: {
            state: '',
            keyword: '',
            startDate: startDate,
            endDate: endDate
        },

        onSubmit: async values => {
            formik.setSubmitting(true);
            const arr = [];

            // Need to to query the database to search the reviewed itineraries
            // noinspection EqualityComparisonWithCoercionJS
            for (let id in cached) {
                const info = cached[id];
                // if (info.state )
                arr.push({...cached[id], id})
                console.log(values);
            }
            // if (values.state == StateEnum.REVIEWED || values.state == StateEnum.ANY) {
            //     console.log(values);
            // } else {
            //
            // }
            setResult(arr);
            formik.setSubmitting(false);
        }
    });

    const onChange = (dates) => {
        formik.setFieldValue('startDate', dates[0])
        formik.setFieldValue('endDate', dates[1])
    };

    return (
        <HStack w={'80%'} h={65} borderWidth="1px" borderRadius="lg" boxShadow={'lg'} p={4}>
            <InputGroup pt={1} w={'40%'}>
                <InputLeftElement
                    pointerEvents="none"
                    children={<Search2Icon color="white.100"/>}
                    pt={2}
                />
                <Input
                    id={"keyword"}
                    type="search"
                    placeholder="Search Itineraries"
                    isRequired
                    onChange={formik.handleChange}
                />
            </InputGroup>
            <Spacer/>
            <HStack>
                <Heading size={14}>Range:</Heading>
                <DatePicker
                    w={300}
                    selectsRange={true}
                    selected={formik.values.startDate}
                    onChange={onChange}
                    startDate={formik.values.startDate}
                    endDate={formik.values.endDate}
                    isClearable={true}
                />
            </HStack>
            <Spacer/>
            <HStack><Heading size={14}>State:</Heading>
                <Select id="state" placeholder="Select state" w={36} onChange={formik.handleChange} isInvalid={formik.values['state'] === ""}>
                    <option value={0}>Any</option>
                    <option value={StateEnum.INACTIVE}>Inactive</option>
                    <option value={StateEnum.INCOMPATIBLE}>Incompatible</option>
                    <option value={StateEnum.ACTIVE}>Active</option>
                    <option value={StateEnum.TO_BE_REVIEWED}>To Be Reviewed</option>
                    <option value={StateEnum.REVIEWED}>Reviewed</option>
                </Select>
            </HStack>
            <Spacer/>
            <IconButton
                icon={<Search2Icon/>}
                isDisabled={formik.values['state'] === ""}
                onClick={formik.handleSubmit}
                isLoading={formik.isSubmitting}
                bg="secondary.light"
                color="white"/>
            <Link/>
        </HStack>
    );
}

function MyItineraries({itineraries}) {
    const [resultItineraries, setResultItineraries] = useState([]);

    return (<>
        <Navbar/>
        <VStack pt={20} align={'center'} w={'100%'}>
            <SearchBar cached={itineraries} setResult={setResultItineraries}/>
            {resultItineraries.length === 0 ? <NoResultsSplash message={'Enter valid keywords'}/>
                : <SimpleGrid columns={{base: 1, md: 2, lg: 3}} spacing={10} pt={5} px={5} pb={4}>
            {resultItineraries.map(itinerary => <ItineraryCard id={itinerary.id} info={itinerary}/>)}
                </SimpleGrid>}
        </VStack>
    </>);
}

const mapStateToProps = state => {
    return {
        itineraries: state.profile.itineraries,
    };
};

export default connect(mapStateToProps, null)(MyItineraries);
