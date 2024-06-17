import { BsPostcard } from "react-icons/bs"
import { FaUsers } from "react-icons/fa"
import { FiUsers } from "react-icons/fi"
import NavButton from '../nav-button'

const Navbar = () => {
    return (
        <nav>
            <ul className="flex flex-col gap-5">
                <li>
                    <NavButton to='/' icon={<BsPostcard />}>
                        Посты
                    </NavButton>
                </li>
                <li>
                    <NavButton to='/following' icon={<FiUsers />}>
                        Подписки
                    </NavButton>
                </li>
                <li>
                    <NavButton to='/followers' icon={<FaUsers />}>
                        Подписчики 
                    </NavButton>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
