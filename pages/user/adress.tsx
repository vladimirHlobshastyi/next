import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./adress.module.scss";
import NavbarInUserComponent from "../../components/NavbarInUserComponent/NavbarInUserComponent";
import useAppSelector from "../../hooks/useAppSelector";
import {
    apartmentNumberOfUserState,
    changeAdress,
    cityOfUserState,
    houseNumberOfUserState,
    streetOfUserState,
} from "../../store/userContactsSlice/userContactsSlice";
import useRootDispatch from "../../hooks/useRootDispatch";
import useIsAuth from "../../hooks/useIsAuth";
import { useRouter } from "next/router";
import Error from "next/error";

type FormInputsType = {
    city: string;
    street: string;
    houseNumber: string;
    apartmentNumber: string;
};

const Adress = () => {
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const { isAuth } = useIsAuth()
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInputsType>();

    const cityOfUser = useAppSelector(cityOfUserState);
    const streetOfUser = useAppSelector(streetOfUserState);
    const houseNumberOfUser = useAppSelector(houseNumberOfUserState);
    const apartmentNumberOfUser = useAppSelector(apartmentNumberOfUserState);

    const dispatch = useRootDispatch()

    const onSubmit = (data: FormInputsType) => {

        try {
            setSubmitting(false);
            setSuccess(true);
            setError(null);
            dispatch(changeAdress(data))
        } catch (error: any) {
            setError(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    if (!isAuth) {
        router.push('/login')
        return <div className={styles.container}></div>
    }
    return (
        <div className={styles.container}>
            <div className={styles.navigate}>
                <NavbarInUserComponent />
            </div>
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <div className={styles.formContainerTitle}>
                        <h2>Адрес доставки</h2>
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="city">Город *</label>
                        <input
                            type="text"
                            id="city"
                            {...register("city", { required: true })}
                            defaultValue={cityOfUser !== undefined && cityOfUser !== null ? cityOfUser : ''}
                        />
                        {errors.city && (
                            <span className={styles.errorMessage}>
                                Это поле обязательно
                            </span>
                        )}
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="street">Улица *</label>
                        <input
                            type="text"
                            id="street"
                            {...register("street", { required: true })}
                            defaultValue={streetOfUser !== undefined && streetOfUser !== null ? streetOfUser : ''}
                        />
                        {errors.street && (
                            <span className={styles.errorMessage}>
                                Это поле обязательно
                            </span>
                        )}
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="houseNumber">Дом *</label>
                        <input
                            type="text"
                            id="houseNumber"
                            {...register("houseNumber", { required: true })}
                            defaultValue={houseNumberOfUser !== undefined && houseNumberOfUser !== null ? houseNumberOfUser : ''}
                        />
                        {errors.houseNumber && (
                            <span className={styles.errorMessage}>
                                Это поле обязательно
                            </span>
                        )}
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="apartmentNumber">Квартира</label>
                        <input
                            type="text"
                            id="apartmentNumber"
                            {...register("apartmentNumber")}
                            defaultValue={apartmentNumberOfUser !== undefined && apartmentNumberOfUser !== null ? apartmentNumberOfUser : ''}
                        />
                    </div>
                    {error && <span className={styles.error}>{error}</span>}
                    {success && <span className={styles.success}>Данные успешно сохранены</span>}
                    <button type="submit" className={styles.submitButton} disabled={submitting}>
                        {submitting ? "Сохранение..." : "Сохранить изменения"}
                    </button>
                </form></div>
        </div>

    );
};

export default Adress;
