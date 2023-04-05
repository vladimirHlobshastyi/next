import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styles from './user_contacts.module.scss'
import useAppSelector from "../../hooks/useAppSelector";
import { changeContacts, emailameState, fullNameState, phoneState } from "../../store/userContactsSlice/userContactsSlice";
import useRootDispatch from "../../hooks/useRootDispatch";
import NavbarInUserComponent from "../../components/NavbarInUserComponent/NavbarInUserComponent";

type FormInputsType = {
    fullName: string;
    phone: string;
    email: string;
};
function contacts() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInputsType>();
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const phoneOfUser = useAppSelector(phoneState)
    const emailOfUser = useAppSelector(emailameState)
    const fullnameOfUser = useAppSelector(fullNameState)

    const dispatch = useRootDispatch()

    const onSubmit = (data: FormInputsType) => {
        dispatch(changeContacts(data))
        setSubmitting(false);
        setSuccess(true);
        setError(null);
    };

    useEffect(() => {
        const phoneInput = document.getElementById("phone");
        if (phoneInput) {
            phoneInput.addEventListener("input", (event: Event) => {
                const phoneValue = (event.target as HTMLInputElement).value;
                if (phoneValue && !phoneValue.startsWith("+38") && !phoneValue.startsWith("+7") && !phoneValue.startsWith("8")) {
                    (event.target as HTMLInputElement).value = "+38" + phoneValue;
                }
            });
        }
    }, []);
    return (
        <div className={styles.container}>
            <div className={styles.navigate}><NavbarInUserComponent /></div>
            <div className={styles.formContainer}>
                < form className={styles.form} onSubmit={handleSubmit(onSubmit)} >
                    <h2>Контакты</h2>
                    <div className={styles.inputContainer}>
                        <label htmlFor="fullName">Контактное лицо (ФИО)*</label>
                        <input
                            id="fullName"
                            type="text"
                            {...register("fullName", { required: true })}
                            defaultValue={fullnameOfUser !== undefined && fullnameOfUser !== null ? fullnameOfUser : ''}
                        />
                        {errors.fullName && (
                            <span className={styles.error}>Поле обязательно для заполнения</span>
                        )}
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="phone">Телефон *</label>
                        <input
                            id="phone"
                            type="tel"
                            {...register("phone", {
                                required: true,
                                pattern: {
                                    value: /^\+380\d{9}$/,
                                    message: "Введите номер в формате +380XXXXXXXXX",
                                },
                            })}
                            defaultValue={phoneOfUser !== undefined && phoneOfUser !== null ? phoneOfUser : ''}
                        />
                        {errors.phone && typeof errors.phone.message === 'string' && (
                            <span className={styles.error}>{errors.phone.message}</span>
                        )}
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="email">Email *</label>
                        <input
                            id="email"
                            type="email"
                            {...register("email", {
                                required: true,
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Введите корректный email",
                                },
                            })}
                            defaultValue={emailOfUser !== undefined && emailOfUser !== null ? emailOfUser : ''}
                        />
                        {errors.email && errors.email.type === 'required' && (
                            <span>This field is required</span>
                        )}
                        {errors.email && errors.email.type === 'pattern' && (
                            <span>Please enter a valid email address</span>
                        )}
                    </div>
                    {error && <span className={styles.error}>{error}</span>}
                    {success && <span className={styles.success}>Данные успешно сохранены</span>}
                    <button type="submit" disabled={submitting}>
                        {submitting ? "Сохранение..." : "Сохранить изменения"}
                    </button>
                </ form>
            </div>
        </div >
    );
}

export default contacts