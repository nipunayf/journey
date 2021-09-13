import DashboardCard from "../containers/Dashboard/DashboardCard";
import Navbar from "../containers/Navbar/Navbar";
import {SimpleGrid, Stack} from "@chakra-ui/react";

export default function Dashboard() {
    return (
        <div>
            <Navbar/>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3}} spacing={10} p={8}>
                <DashboardCard/>
                <DashboardCard/>
                <DashboardCard/>
                <DashboardCard/>
                <DashboardCard/>

            </SimpleGrid>

        </div>
    )
}
