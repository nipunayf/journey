import DashboardCard from "../containers/Dashboard/DashboardCard";
import Navbar from "../containers/Navbar/Navbar";
import {Flex, SimpleGrid} from "@chakra-ui/react";

export default function Dashboard() {
    return (
        <div>
            <Navbar/>
            <Flex>
                <SimpleGrid columns={{base: 1, md: 2, lg: 4}} spacing={10} p={20}>
                    <DashboardCard/>
                    <DashboardCard/>
                    <DashboardCard/>
                    <DashboardCard/>
                    <DashboardCard/>

                </SimpleGrid>
            </Flex>
        </div>
    )
}
