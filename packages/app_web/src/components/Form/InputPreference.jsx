import {Box, FormControl, Heading, HStack, Spacer, useRadio, useRadioGroup, VStack} from "@chakra-ui/react";
import {useState} from "react";

function RadioCard(props) {
    const {getInputProps, getCheckboxProps} = useRadio(props)

    const input = getInputProps()
    const checkbox = getCheckboxProps()

    return (
        <Box as="label" w={32}>
            <input {...input} />
            <Box
                {...checkbox}
                cursor="pointer"
                borderWidth="1px"
                borderRadius="md"
                boxShadow="md"
                _checked={{
                    bg: "secondary.light",
                    color: "white",
                    borderColor: "secondary.light",
                }}
                _focus={{
                    boxShadow: "outline",
                }}
                fontSize={14}
                px={3}
                py={2}
                textAlign={'center'}
            >
                {props.children}
            </Box>
        </Box>
    )
}

export default function InputPreference({title, options, formik, id}) {

    const setValue = value => {
        formik.setFieldValue(id, options.indexOf(value)-1)
    }

    const {getRootProps, getRadioProps} = useRadioGroup({
        name: "framework",
        value: options[formik.values[id]+1],
        onChange: setValue
    })

    const group = getRootProps()

    return (
        <VStack spacing={0.8} alignItems={'left'}>
            <Heading size={20}>{title}</Heading>
            <Spacer/>
                <HStack {...group}>
                    {options.map((value) => {
                        const radio = getRadioProps({value})
                        return (
                            <RadioCard key={value} {...radio}>
                                {value}
                            </RadioCard>
                        )
                    })}
                </HStack>
        </VStack>
    )
}
