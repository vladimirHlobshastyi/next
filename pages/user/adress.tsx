import React from "react";
import { useForm } from "react-hook-form";
import styles from "./adress.module.scss";
import NavbarInUserComponent from "../../components/NavbarInUserComponent/NavbarInUserComponent";

type FormInputsType = {
    city: string;
    street: string;
    houseNumber: string;
    apartmentNumber: string;
};

const Form = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInputsType>();

    const onSubmit = (data: FormInputsType) => {
        console.log(data);
    };

    return (<div className={styles.container}>
        <div className={styles.navigate}><NavbarInUserComponent /></div>
        <div className={styles.formContainer}> <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.inputContainer}>
                <label htmlFor="city">Город *</label>
                <input type="text" id="city" {...register("city", { required: true })} />
                {errors.city && (
                    <span className={styles.errorMessage}>Это поле обязательно</span>
                )}
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor="street">Улица *</label>
                <input
                    type="text"
                    id="street"
                    {...register("street", { required: true })}
                />
                {errors.street && (
                    <span className={styles.errorMessage}>Это поле обязательно</span>
                )}
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor="houseNumber">Дом *</label>
                <input
                    type="text"
                    id="houseNumber"
                    {...register("houseNumber", { required: true })}
                />
                {errors.houseNumber && (
                    <span className={styles.errorMessage}>Это поле обязательно</span>
                )}
            </div>
            <div className={styles.inputContainer}>
                <label htmlFor="apartmentNumber">Квартира</label>
                <input type="text" id="apartmentNumber" {...register("apartmentNumber")} />
            </div>
            <button type="submit" className={styles.submitButton}>
                Принять
            </button>
        </form></div>
    </div>

    );
};

export default Form;
