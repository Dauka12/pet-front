import { Card as NextUiCard } from '@nextui-org/react'
import type React from 'react'

type Props = {
    avatarUrl: string
    name: string
    authorId: string
    content: string
    commentId?: string
    likesCount?: number
    commentsCount?: number
    createdAt?: Date
    id?: string
    cardFor: 'comment' | 'post' | 'current-post'
    likedByUser: boolean
}

const Card: React.FC<Props> = ({
    avatarUrl = '',
    name = '',
    authorId = '',
    content = '',
    commentId = '',
    likesCount = 0,
    commentsCount = 0,
    createdAt = Date,
    id = '',
    cardFor = 'post',
    likedByUser = false,
}) => {

    return (
        <NextUiCard>
            
        </NextUiCard>
    )
}

export default Card
