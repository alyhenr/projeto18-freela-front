export default (setSubmitting, setRequestResult) => (
    (result, message) => {
        setRequestResult(prev => ({ ...prev, [result]: true, message }));

        setTimeout(() => {
            setRequestResult(prev => ({ ...prev, [result]: false, message }))
        }, 2000);

        setSubmitting(false);
    }
);