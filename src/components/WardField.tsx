import { TextField } from '@mui/material';
import { useField } from 'formik';

const WardField = () => {
  const [field, meta] = useField("ward");
  return (
    <TextField
      {...field}
      label="Ward"
      placeholder="4"
      variant="outlined"
      fullWidth
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    />
  );
};

export default WardField;
