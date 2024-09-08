import './App.css';
import InputField from './InputField'; 
import RadioGroupField from './RadioGroupField'; 
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import * as yup from 'yup';
import MultiStepForm from './MultiStepForm'; 
import CountryField from './components/CountryField'; 
import DistrictField from './components/DistrictField'; 
import MunicipalityField from './components/MunicipalityField'; 
import WardField from './components/WardField';
import CityField from './components/CityField'; 
import FormStep from './FormStep'; 
import { useFormikContext } from 'formik'
import { Box, Typography } from '@mui/material';


const validationSchema = yup.object({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  phone: yup.string()
  .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
  .required('Phone is required'),
  birthDate: yup.date().required('Birth Date is required'),
  gender: yup.string().required('Gender is required'),
  
})

function ReviewStep() {
  const { values } = useFormikContext<{ firstName: string; middleName: string; lastName: string; phone: string; birthDate: string; gender: string; image: string; country: string; district: string; ward: string; city: string; municipality: string}>(); 
  const defaultImage = '/default-pp.jpg';

  return (
    <>
    <div style={{ textAlign: 'left' }}>
      <img 
          src={values.image || defaultImage} 
          alt="Uploaded or Default" 
          width="100" 
          style={{ display: 'block', marginBottom: '10px', borderRadius: '20px' }}
        />
    </div>    

      <table>
        <tr>
          <th>
            <h3>Personal Details</h3>
          </th>
        </tr>
        <tr>
          <td><p><strong>First Name:</strong> {values.firstName}</p></td>
          <td><p><strong>Middle Name:</strong> {values.middleName}</p></td>
          <td><p><strong>Last Name:</strong> {values.lastName}</p></td>
        </tr>
        <tr>
          <td><p><strong>Phone:</strong> {values.phone}</p></td>
          <td><p><strong>Birth Date:</strong> {values.birthDate}</p></td>
        </tr>
        <tr>
          <td><p><strong>Gender:</strong> {values.gender}</p></td>
        </tr>
      </table>
      <table>
        <tr>
          <th>
            <h3>Address</h3>
          </th>
        </tr>
        <tr>
          <td><p><strong>Country:</strong> {values.country}</p></td>
          <td><p><strong>District:</strong> {values.district}</p></td>
          <td><p><strong>Municipality/local:</strong> {values.municipality}</p></td>
        </tr>
        <tr>
          <td><p><strong>City:</strong> {values.city}</p></td>
          <td><p><strong>Ward:</strong> {values.ward}</p></td>
        </tr>
      </table>

    </>
  );
}

function UploadImageStep() {
  const { setFieldValue, values } = useFormikContext<{ image: string }>(); 
  const defaultImage = '/default-pp.jpg';


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setFieldValue('image', fileUrl); 
    }
  };

  return (
    <>
      <img 
          src={values.image || defaultImage} 
          alt="Preview" 
          width="200" 
          style={{ marginTop: '10px' }}
        />
        <br />
        <br />
      <Button component="label" variant="contained">
        Upload Image
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
      </Button>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <header className="header">
      <div className="header-logo">
          <img src="/logo.png" alt="Logo" /> 
        </div>
        </header>
        <Box sx={{ padding: 2, textAlign: 'center', fontWeight: 'bold' }}>
        <Typography variant="h3">Register</Typography>
      </Box>
        <main className="App-header">
          <div className="Card-header">
          <Card sx={{
            width: '100%',
            bgcolor: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid gray',
            borderRadius: '10px 10px 10px 10px',
            boxShadow: 'none', 
           }}>
          <CardContent>
            <MultiStepForm initialValues={{
                firstName: '',
                lastName: '',
                phone: '',
                birthDate: '',
                gender: ''

              }}
              onSubmit={values => {
                alert(JSON.stringify(values, null, 2))
              }}
              >
                {/* PERSONAL DETAILS FORM*/}
                <FormStep 
                  stepName='Personal Details' 
                  onSubmit={() => console.log('Step1 Sumbit')}
                  validationSchema={validationSchema}
                >

                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <InputField name='firstName' label="First Name"/>
                      </Grid>
                      <Grid item xs={4}>
                        <InputField name='middleName' label="Middle Name"/>
                      </Grid>
                      <Grid item xs={4}>
                        <InputField name='lastName' label="Last Name"/>
                      </Grid>
                    </Grid>
                    
                    <Grid container spacing={2} sx={{ marginTop: 2 }}>
                      <Grid item xs={6}>
                        <InputField name="phone" label="Phone" />
                      </Grid>
                      <Grid item xs={6}>
                      <InputField
                      name="birthDate"
                      label="Birth Date"
                      type="date"
                    
                    />
                      </Grid>
                    </Grid>

                    <Grid container spacing={2} sx={{ marginTop: 2 }}>
                    <Grid item xs={12}>
                    <RadioGroupField 
                        name="gender"
                        label="Gender"
                        options={[
                            { value: 'male', label: 'Male' },
                            { value: 'female', label: 'Female' },
                            { value: 'other', label: 'Other' }
                        ]}
                    />
                    </Grid>
                    </Grid>
                   
                </FormStep>
                {/* END OF PERSONAL DETAILS FORM */}   

                {/* ADDRESS FORM*/}
                <FormStep
                  stepName="Address"
                  onSubmit={() => console.log('Step2 Submit')}
                >
                    <Grid container spacing={2} padding={1} sx={{ textAlign: 'left' }}>
                      <Grid item xs={4 }>
                        <CountryField />
                      </Grid> 
                      <Grid item xs={4}>
                        <DistrictField />
                      </Grid> 
                      <Grid item xs={4}>
                        <MunicipalityField />
                      </Grid> 
                    </Grid>

                    <Grid container spacing={2} padding={1}>
                      <Grid item xs={4}>
                        <CityField />
                      </Grid>
                      <Grid item xs={4}>
                        <WardField />
                      </Grid>
                    </Grid>
                </FormStep>
                {/* END OF ADDRESS FORM */}   
                       


                {/* PROFILE */}
                <FormStep
                  stepName="Profile"
                  onSubmit={() => console.log('Step3 Sumbit')}
                  >
                    <UploadImageStep /> 
                </FormStep>

                <FormStep
                  stepName="Review"
                  onSubmit={() => console.log('Step4 Sumbit')}
                  >
                  <ReviewStep />
                  
                </FormStep>
                {/* END OF PROFILE FORM */}
              
            </MultiStepForm>
            </CardContent>
            </Card>
        </div>
        </main>
    </div>
  );
}

export default App;
