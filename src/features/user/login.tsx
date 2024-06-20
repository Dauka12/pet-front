import { Button, Link } from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLazyCurrentQuery, useLoginMutation } from "../../app/services/userApi";
import ErrorMessage from "../../components/error-message";
import Input from "../../components/input";
import { hasErrorField } from "../../utils/has-error-field";
type Login = {
    email: string;
    password: string;
}

type Props = {
    setSelected: (value: string) => void;
}

const Login = ({setSelected}: Props) => {
    const { handleSubmit, control, formState: {errors} } = useForm<Login>({
        mode: 'onChange',
        reValidateMode: 'onBlur',
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const [login, { isLoading }] = useLoginMutation();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [triggerCurrentQuery] = useLazyCurrentQuery();

    const onSubmit = async (data: Login) => {
        try {
            await login(data).unwrap();
            await triggerCurrentQuery().unwrap();
            navigate("/")
        } catch (error) {
            if (hasErrorField(error)) {
                setError(error.data.error)
            }
            
        }
    }
    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <Input control={control} name="email" label="Email" type="email" required="Обьязательное поля"></Input>
            <Input control={control} name="password" label="Пароль" type="password" required="Обьязательное поля"></Input>
            <ErrorMessage error={error}></ErrorMessage>
            <p className="text-center text-small">
                Нет аккаунта?{" "}
                <Link
                    size="sm"
                    className="cursor-pointer"
                    onPress={() => setSelected("sign-up")}
                >
                    Зарегестрируйтесь
                </Link>
            </p>
            <div className="flex gap-2 justify-end">
                <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
                    Войти
                </Button>
            </div>
        </form>
    )
}

export default Login
