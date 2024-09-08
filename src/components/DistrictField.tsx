import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useField } from 'formik';

const districts = ["Kathmandu", "Bhaktapur", "Lalitpur", "Pokhara", "Chitwan"]; // Static list

const DistrictField = () => {
  const [field, meta, helpers] = useField("district");

  return (
    <FormControl fullWidth>
      <InputLabel>District</InputLabel>
      <Select
        {...field}
        value={field.value || ''}
        onChange={(e) => helpers.setValue(e.target.value)}
        variant="outlined"
        label="District"
        placeholder="Kathmandu"
      >
        {districts.map((district) => (
          <MenuItem key={district} value={district}>
            {district}
          </MenuItem>
        ))}
      </Select>
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </FormControl>
  );
};

export default DistrictField;
