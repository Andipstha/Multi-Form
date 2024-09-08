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
                        color: '#fff', // Optional: set text color to white for better contrast
                        marginRight: 4,
                        '&:hover': {
                            backgroundColor: 'rgba(77, 175, 78, 0.8)', // Optional: lighter color on hover
                        }
                    }}
                    >Back</Button>
        )} 

        <Button 
            sx={{
                        backgroundColor: 'rgba(77, 175, 78, 1)', // Custom background color
                        color: '#fff', // Optional: set text color to white for better contrast
                        marginRight: 4,
                        '&:hover': {
                            backgroundColor: '#43066C', // Optional: lighter color on hover
                        }
                    }} 
            variant='contained' 
            type="submit">{props.isLastStep ? 'Submit' : 'Next'}
        </Button>
        </div>

    )
}

export default FormNavigation