import {Heading, VStack} from "@chakra-ui/react";
import InputPreference from "../../components/Form/InputPreference";

export default function Preferences({formik}) {
    return <>
        <VStack>
            <InputPreference
                title={"Budget"}
                options={["Cheap", "Average", "Expensive"]}
                id={'budget'}
                formik={formik}/>
            <InputPreference
                title={"Popularity"}
                options={["Hidden-Gem", "Moderate", "Popular"]}
                id={'popularity'}
                formik={formik}/>
            <InputPreference
                title={"Energy"}
                options={["Relaxing", "Medium-Paced", "Adventurous"]}
                id={'energy'}
                formik={formik}/>
            <InputPreference
                title={"Knowledge"}
                options={["Entertaining", "Average", "Informational"]}
                id={'knowledge'}
                formik={formik}/>
            <InputPreference
                title={"Introversion"}
                options={["In-Doors", "Balanced", "Nature"]}
                id={'introversion'}
                formik={formik}/>
        </VStack>
    </>;
}
