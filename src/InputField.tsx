// import TextField from '@mui/material/TextField';
import { TextField, TextFieldProps } from '@mui/material';
import { FieldConfig, useField } from 'formik';
import './App.css';

interface Props extends FieldConfig {
    label: string;
    type?: string; // Added type for flexibility
}

const InputField = ({ label, type = 'text', ...props }: Props) => {
    const [field, meta] = useField(props as any);

    return (
        <TextField
            fullWidth
            label={label}
            type={type}
            variant='standard'
            {...field}
            {...(props as TextFieldProps)}
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error}
            InputLabelProps={{
                shrink: true,
              }}
              sx={{
                // Add styles to adjust the placeholder and input
                '& .MuiInputBase-input': {
                  padding: '10px', // Adjust padding to ensure space for placeholder
                },
                '& .MuiInputLabel-root': {
                  transform: 'translate(14px, 12px) scale(1)', // Ensure label is properly positioned
                },
                '& .MuiInputLabel-shrink': {
                  transform: 'translate(14px, -6px) scale(0.75)', // Adjust label shrink
                },
                '& input[type="date"]': {
                  textAlign: 'left', // Align text for date input
                },
              }}
        />
    );
};

export default InputField;
