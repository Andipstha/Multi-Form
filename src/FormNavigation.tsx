import Button from '@mui/material/Button';
import { FormikValues } from 'formik';

interface Props {
    hasPrevious?: boolean;
    onBackClick: (values: FormikValues) => void;
    isLastStep: boolean;
}

const FormNavigation = (props: Props) => {
    return(
        <div style={{display: 'flex',
            marginTop: 50,
            justifyContent: 'right',

        }}>
            {props.hasPrevious &&( 
                <Button 
                    variant='contained' 
                    type='button' 
                    onClick={props.onBackClick}
                    sx={{
                        backgroundColor: 'rgba(104, 137, 104, 1)',
                        color: '#fff', 
                        marginRight: 4,
                        '&:hover': {
                            backgroundColor: 'rgba(77, 175, 78, 0.8)', 
                        }
                    }}
                    >Back</Button>
        )} 

        <Button 
            sx={{
                        backgroundColor: 'rgba(77, 175, 78, 1)', 
                        color: '#fff', 
                        '&:hover': {
                            backgroundColor: '#43066C', 
                        }
                    }} 
            variant='contained' 
            type="submit">{props.isLastStep ? 'Submit' : 'Next'}
        </Button>
        </div>

    )
}

export default FormNavigation