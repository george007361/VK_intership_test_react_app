import { ObjectSchema, object, string } from "yup";
import { AgeDetectorFormFields } from "../types/AgeDetector";

export const ageDetectorFormShema: ObjectSchema<AgeDetectorFormFields> = object().shape({
    name: string()
        .required('Обязательное поле')
        .matches(/^[a-zа-я]+$/i, 'Только буквы, в одно слово'),
});