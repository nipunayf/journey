import {Heading, VStack} from "@chakra-ui/react";
import InputPreference from "../../components/Form/InputPreference";

export default function Preferences({formik}) {
    return <>
        <VStack>
            <InputPreference
                defaultValue={"Average"}
                title={"Budget"}
                options={["Cheap", "Average", "Expensive"]}
                id={'budget'}
                formik={formik}/>
            <InputPreference
                defaultValue={"Moderate"}
                title={"Popularity"}
                options={["Hidden-Gem", "Moderate", "Popular"]}
                id={'popularity'}
                formik={formik}/>
            <InputPreference
                defaultValue={"Medium-Paced"}
                title={"Energy"}
                options={["Relaxing", "Medium-Paced", "Adventurous"]}
                id={'energy'}
                formik={formik}/>
            <InputPreference
                defaultValue={"Average"}
                title={"Knowledge"}
                options={["Entertaining", "Average", "Informational"]}
                id={'knowledge'}
                formik={formik}/>
        </VStack>
    </>;
}
