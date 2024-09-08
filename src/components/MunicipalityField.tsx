import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useField } from 'formik';

const municipalities = ["Lalitpur", "Kirtipur", "Madhyapur Thimi", "Bhaktapur"]; // Static list

const MunicipalityField = () => {
  const [field, meta, helpers] = useField("municipality");

  return (
    <FormControl fullWidth>
      <InputLabel>Municipality/Local</InputLabel>
      <Select
        {...field}
        value={field.value || ''}
        onChange={(e) => helpers.setValue(e.target.value)}
        variant="outlined"
        label="Municipality/Local"
        placeholder="Lalitpur"
      >
        {municipalities.map((municipality) => (
          <MenuItem key={municipality} value={municipality}>
            {municipality}
          </MenuItem>
        ))}
      </Select>
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </FormControl>
  );
};

export default MunicipalityField;
