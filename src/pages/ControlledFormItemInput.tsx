import { FormItem, FormItemProps, Input, InputProps } from "@vkontakte/vkui";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import React from "react";

interface ControlledFormItemInputProps<Fields extends FieldValues> {
    control: Control<Fields>;
    name: Path<Fields>;
    FormItemProps?: Omit<FormItemProps, 'status'>;
    InputProps?: Omit<InputProps, 'getRef'>;
}

export default function ControlledFormItemInput<T extends FieldValues>({
    control,
    name,
    InputProps,
    FormItemProps,
}: ControlledFormItemInputProps<T>) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { ref, onChange, ...rest }, fieldState: { invalid, error, isTouched } }) => {
                let status: FormItemProps['status'] = 'default';

                if (isTouched) {
                    status = invalid ? 'error' : 'valid';
                }

                const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange(e);
                    InputProps?.onChange?.(e);
                }
                
                return (
                    <FormItem
                        {...FormItemProps}
                        status={status}
                        bottom={error ? error.message : ''}
                    >
                        <Input
                            {...InputProps}
                            onChange={handleChange}
                            getRef={ref}
                            {...rest}
                        />
                    </FormItem>
                );
            }}
        />
    );
}