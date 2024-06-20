import { Spinner } from '@nextui-org/react'
import { useCurrentQuery } from '../../app/services/userApi'
type Props = {
    children: JSX.Element
}

const AuthGuard = ({ children }: Props) => {
    const { isLoading } = useCurrentQuery();

    if (isLoading) {
        return <Spinner />
    }

    return children
}

export default AuthGuard
