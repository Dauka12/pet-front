import type React from 'react';
import { type IconType } from 'react-icons';
import { Fa0 } from 'react-icons/fa6';

type Props = {
    count: number;
    Icon: IconType;
}

const MetaInfo: React.FC<Props> = () => {
    return (
        <div>
            <Fa0/>
        </div>
    )
}

export default MetaInfo
