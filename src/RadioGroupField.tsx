import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, FormHelperText } from '@mui/material';
import { useField } from 'formik';

interface RadioGroupProps {
    name: string;
    label: string;
    options: { value: string; label: string }[];
}

const RadioGroupField = ({ name, label, options }: RadioGroupProps) => {
    const [field, meta, helpers] = useField(name);

    return (
        <FormControl
            component="fieldset"
            error={!!(meta.touched && meta.error)}
            sx={{ textAlign: 'left', width: '100%' }}
        >
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup
                {...field}
                onChange={(event) => helpers.setValue(event.target.value)}
                onBlur={() => helpers.setTouched(true)}
                row
            >
                {options.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                    />
                ))}
            </RadioGroup>
            {meta.touched && meta.error ? (
                <FormHelperText>{meta.error}</FormHelperText>
            ) : null}
        </FormControl>
    );
};

export default RadioGroupField;
