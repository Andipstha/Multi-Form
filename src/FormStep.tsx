import React from 'react';
import { ObjectSchema } from 'yup';

interface FormStepProps {
    stepName?: string;
    onSubmit?: (values: any) => void;
    children: React.ReactNode;
    validationSchema?: ObjectSchema<any>;

}


const FormStep: React.FC<FormStepProps> = ({ stepName = '', onSubmit, children }) => {
    return (
        <div>
            {stepName && <h5 style={{ textAlign: 'left' }}>{stepName}</h5>}
            {children}
        </div>
    );
};

export default FormStep;
