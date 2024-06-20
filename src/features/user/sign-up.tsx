import { Button, Link } from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLazyCurrentQuery, useRegisterMutation } from "../../app/services/userApi";
import ErrorMessage from "../../components/error-message";
import Input from "../../components/input";
import { hasErrorField } from "../../utils/has-error-field";
type SignUp = {
    name: string;
    email: string;
    password: string;
}

type Props = {
    setSelected: (value: string) => void;
}

const SignUp: React.FC<Props> = ({ setSelected }) => {
    const { handleSubmit, control, formState: { errors } } = useForm<SignUp>({
        mode: 'onChange',
        reValidateMode: 'onBlur',
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const [register, { isLoading }] = useRegisterMutation();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [triggerCurrentQuery] = useLazyCurrentQuery();

    const onSubmit = async (data: SignUp) => {
        try {
            await register(data).unwrap();
            setSelected('login')
        } catch (error) {
            if (hasErrorField(error)) {
                setError(error.data.error)
            }
        }
    }
    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <Input control={control} name="name" label="Имя" type="text" required="Обьязательное поля"></Input>
            <Input control={control} name="email" label="Email" type="email" required="Обьязательное поля"></Input>
            <Input control={control} name="password" label="Пароль" type="password" required="Обьязательное поля"></Input>
            <ErrorMessage error={error}></ErrorMessage>
            <p className="text-center text-small">
                Есть аккаунт?{" "}
                <Link
                    size="sm"
                    className="cursor-pointer"
                    onPress={() => setSelected("auth")}
                >
                    Войдите
                </Link>
            </p>
            <div className="flex gap-2 justify-end">
                <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
                    Регистрация
                </Button>
            </div>
        </form>
    )
}

export default SignUp;
