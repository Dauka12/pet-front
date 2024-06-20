import { Input as NextInput } from '@nextui-org/react';
import type React from 'react';
import { useController, type Control } from 'react-hook-form';

type FormValues = {
    [key: string]: any;
};

type Props = {
    name: string;
    label: string;
    placeholder?: string;
    type?: string;
    control: Control<any>;
    required?: string;
    endContent?: JSX.Element;
}

const Input: React.FC<Props> = (
    {
        name,
        label,
        placeholder,
        type,
        control,
        required = '',
        endContent }
) => {
    const { field, fieldState: { invalid }, formState: {errors} } = useController({
            name,
            control,
            rules: {
                required
            }
        });
    return (
        <NextInput
            id={name}
            label={label}
            type={type}
            placeholder={placeholder}
            value={field.value}
            name={field.name}
            isInvalid={invalid}
            onChange={field.onChange}
            onBlur={field.onBlur}
            errorMessage ={`${errors[name]?.message ?? '' }`}
        >

        </NextInput>
    )
}

export default Input
