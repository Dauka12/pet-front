import type React from 'react';
import type { ReactElement } from 'react';


type Props = {
    children: ReactElement[] | ReactElement
}


const Container: React.FC<Props> = ({ children }) => {
  return (
    <div className='flex max-w-screen-xl mx-auto mt-10'>
      {children}
    </div>
  )
}

export default Container
