import { ObjectSchema, object, string } from "yup";

import { AgeRequestData } from "../types/AgeRequestData";

export const REQUEST_FORM_SCHEMA: ObjectSchema<AgeRequestData> = object().shape({
    name: string()
        .required('Обязательное поле')
        .matches(/^[a-zа-я]+$/i, 'Только буквы, в одно слово'),
});