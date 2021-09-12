import {Autocomplete} from "@react-google-maps/api";
import {useState} from "react";
import {IconButton, Input, InputGroup, InputLeftElement, Link} from "@chakra-ui/react";
import {Search2Icon} from "@chakra-ui/icons";

export default function AutoComplete() {
    const [autocomplete, setAutocomplete] = useState(null);

    const onLoad = (autocomplete) => setAutocomplete(autocomplete);
    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();
    }

    return (
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
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
        </Autocomplete>
    );
}