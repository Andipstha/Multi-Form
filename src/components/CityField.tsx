import { TextField } from '@mui/material';
import { useField } from 'formik';

const CityField = () => {
  const [field, meta] = useField("city");
  return (
    <TextField
      {...field}
      label="City"
      placeholder="Kathmandu"
      variant="outlined"
      fullWidth
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      
    />
  );
};

export default CityField;
