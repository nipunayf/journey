import {Autocomplete} from "@react-google-maps/api";
import {useState} from "react";
import {Input, InputGroup, InputLeftElement} from "@chakra-ui/react";
import {Search2Icon} from "@chakra-ui/icons";
import {useHistory} from 'react-router-dom';

export default function SearchBar() {
    const history = useHistory();

    const [autocomplete, setAutocomplete] = useState({
        getPlace: () => {}
    });

    const onLoad = (autocomplete) => setAutocomplete(autocomplete);

    const onPlaceChanged = async () => {
        const place = autocomplete.getPlace();
        if(!place.photos) return

        let image = place.photos[0].getUrl();
        for (let i = 0; i < place.photos.length; i++) {
            if (place.photos[i].height <= place.photos[i].width) {
                image = place.photos[i].getUrl();
                break;
            }
        }
        const Details = {
            Image: image,
            Id: place.place_id,
            Name: place.name
        }
        console.log(Details);
        history.push({
            pathname: `/search`,
            search: `?q=${place.name}`,
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
                />
                {/*<IconButton*/}
                {/*    icon={<Search2Icon/>}*/}
                {/*    bg="secondary.light"*/}
                {/*    color="white" onClick={() => history.push({*/}
                {/*    pathname: `/search`,*/}
                {/*    search: `?query=${autocomplete.getPlace().name}`*/}
                {/*})}/>*/}
            </InputGroup>
        </Autocomplete>
    );
}
