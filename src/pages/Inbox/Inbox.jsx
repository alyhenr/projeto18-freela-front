import CustomLoading from '../../components/layout/CustomLoading';

const Inbox = () => {
    return (
        <CustomLoading
            loading={true}
            message={"This page is in progress..."}
        >
        </CustomLoading>
    )
};

export default Inbox;