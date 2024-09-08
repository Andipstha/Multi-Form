// CountryField.tsx
import { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useField } from 'formik';
import axios from 'axios';

const CountryField = () => {
  const [countries, setCountries] = useState<string[]>([]);
  const [field, meta, helpers] = useField("country");

  useEffect(() => {
    // Fetch countries from an API (like restcountries API)
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        const countryNames = response.data.map((country: any) => country.name.common);
        setCountries(countryNames);
      })
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  return (
    <FormControl fullWidth>
      <InputLabel>Country</InputLabel>
      <Select
        {...field}
        value={field.value || ''}
        onChange={(e) => helpers.setValue(e.target.value)}
        variant="outlined"
        label="Country"
        placeholder="Nepal"
        
      >
        {countries.map((country) => (
          <MenuItem key={country} value={country}>
            {country}
          </MenuItem>
        ))}
      </Select>
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
      
    </FormControl>
  );
};

export default CountryField;
