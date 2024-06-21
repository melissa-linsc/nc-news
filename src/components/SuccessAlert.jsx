import CheckIcon from '@mui/icons-material/Check';
import { Alert }from '@mui/material';

export function SuccessAlert({showAlertMessage, alertMessage}) {

    return (
        <>  
             { showAlertMessage && !alertMessage.includes('Error') && alertMessage ? <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" className="alert-message">
                {alertMessage}
            </Alert> : null }
                { showAlertMessage && alertMessage.includes('Error') && alertMessage ? <Alert severity="error" className="alert-message">
                {alertMessage}
            </Alert> : null }
        </>
    )
}