import {Autocomplete} from "@react-google-maps/api";
import {useState} from "react";
import {IconButton, Input, InputGroup, InputLeftElement} from "@chakra-ui/react";
import {Search2Icon} from "@chakra-ui/icons";
import {useHistory} from 'react-router-dom';


export default function AutoComplete() {
    const history = useHistory();

    const [autocomplete, setAutocomplete] = useState(null);

    const onLoad = (autocomplete) => setAutocomplete(autocomplete);

    const onPlaceChanged = async() => {

        let image = autocomplete.getPlace().photos[0].getUrl();
        for (let i = 0; i < autocomplete.getPlace().photos.length; i++) {
            if (autocomplete.getPlace().photos[i].height <= autocomplete.getPlace().photos[i].width) {
                image = autocomplete.getPlace().photos[i].getUrl();
                break;
            }
        }
        const Details = {
            Image:image,
            Id:autocomplete.getPlace().place_id,
        }
        console.log(Details);
        history.push({
            pathname: `/search`,
            search: `?q=${autocomplete.getPlace().name}`,
            state: Details
        });
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
                // onChange={((e) => {
                //     console.log(e.target.value);
                //     setKeyword(e.target.value);
                // }).bind(this)}
                // onSelect={((e) => {
                //     console.log(e.target.value);
                //     setKeyword(e.target.value);
                // }).bind(this)}
                // value={keyword}
                // onKeyPress={((e) => {
                //     if (e.key === 'Enter' && keyword.length !== 0) {
                //         setKeyword(keyword)
                //         history.push(`/search/${keyword}`, {keyword: keyword});
                //
                //     }
                // }).bind(this)}
                // onClick={(() => {
                //     if (keyword.length !== 0) {
                //         setKeyword(keyword)
                //         history.push(`/search/${keyword}`, {keyword: keyword});
                //     }
                // }).bind.this}
            />

            <IconButton
                icon={<Search2Icon/>}
                bg="secondary.light"
                color="white" onClick={() => history.push({
                pathname: `/search`,
                search: `?query=${autocomplete.getPlace().name}`
            })}/>
        </InputGroup>
    </Autocomplete>
);
}