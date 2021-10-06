import {HStack, Text} from "@chakra-ui/react";
import {BsStar, BsStarFill, BsStarHalf} from "react-icons/all";

export default function Rating ({number}) {
    return(
        <HStack>
            {Array(5)
                .fill('')
                .map((_, i) => {
                    const roundedRating = Math.round(number * 2) / 2;
                    if (roundedRating - i >= 1) {
                        return (
                            <BsStarFill
                                key={i}
                                style={{marginLeft: '1'}}
                                color={i < number ? '#0277bd' : 'primary.main'}
                            />
                        );
                    }
                    if (roundedRating - i === 0.5) {
                        return <BsStarHalf color={'#0277bd'} key={i} style={{marginLeft: '1'}}/>;
                    }
                    return <BsStar key={i} style={{marginLeft: '1'}} color={'#0277bd'}  />;
                })}
            <Text fontSize={15}>{number}</Text>
        </HStack>
    );
}
