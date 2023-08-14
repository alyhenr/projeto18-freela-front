import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useCustomLoader from '../../hooks/useCustomLoader';
import loader from './loader';

import CustomLoading from '../../components/layout/CustomLoading';

const User = () => {
    const { id } = useParams();

    const [userData, setUserData] = useState();

    const { data, err, loading } = useCustomLoader({
        loaderFunction: () => loader({ id })
    })

    useEffect(() => {
        if (data) {
            setUserData(data);
        }
    }, [data, err]);
    return (
        <CustomLoading
            err={err}
            loading={true}
            message={"On progess..."}
        // message={"We are collecting the informations of this samurais..."}
        >

        </CustomLoading>
    )
}

export default User;