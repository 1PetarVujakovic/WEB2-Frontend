import { useEffect, useState } from "react";
import { Profile } from "../../models/Auth/Profile";
import { CreateRideResponse } from "../../models/Ride"
import { AuthService } from "../../Services/AuthService";

interface IProps{
    ride: CreateRideResponse;
}

export const RideTableRow = ({ride}:IProps) => {
    const [client, setClient] = useState<Profile|null>(null);
    const [driver, setDriver] = useState<Profile|null>(null);

    async function fetchRideDetails() {
        const clientProfile = await AuthService.GetSpecificUserProfile(ride.clientId);
        setClient(clientProfile);

        if (ride.driverId) {
            const driverProfile = await AuthService.GetSpecificUserProfile(ride.driverId);
            setDriver(driverProfile);
        }
    }

    useEffect(() => {
        fetchRideDetails();
    },[])

    return (
        <tr key={ride.id}>
            <td>{ride.createdAtTimestamp ? (new Date(ride.createdAtTimestamp).toUTCString()) : "N/A"}</td>
            <td>{ride.startAddress}</td>
            <td>{ride.endAddress}</td>
            <td>{client ? client.email : "N/A"}</td>
            <td>
                {driver ? driver.email : 'N/A'}
            </td>
            <td>{ride.status}</td>
            <td>{ride.price}</td>
        </tr>
    );
}