import { CardBody, CardFooter, CardHeader, Card as NextUiCard, Spinner } from '@nextui-org/react'
import type React from 'react'
import { useState } from 'react'
import { RiDeleteBinLine } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { useDeleteCommentMutation } from '../../app/services/commentApi'
import { useLikePostMutation, useUnlikePostMutation } from '../../app/services/likeApi'
import { useDeletePostMutation, useLazyGetAllPostsQuery, useLazyGetPostByIdQuery } from '../../app/services/postApi'
import { selectCurrent } from '../../features/user/userSlice'
import { formatToClientDate } from '../../utils/format-to-client-date'
import Typography from '../typography'
import User from '../user'

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
    createdAt,
    id = '',
    cardFor = 'post',
    likedByUser = false,
}) => {
    const [likePost] = useLikePostMutation();
    const [unlikePost] = useUnlikePostMutation();
    const [triggerGetAllPosts] = useLazyGetAllPostsQuery();
    const [triggerGetPostById] = useLazyGetPostByIdQuery();
    const [deletePost, deletePostStatus] = useDeletePostMutation();
    const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation();
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const currentUser = useAppSelector(selectCurrent);

    return (
        <NextUiCard className='mb-5'>
            <CardHeader className='justify-between items-center bg-transparent'>
                <Link to={`/users/${id}`}>
                    <User
                        name={name}
                        className='text-small font-semibold leading-non text-default-600'
                        avatarUrl={avatarUrl}
                        description={createdAt && formatToClientDate(createdAt)}
                    />
                </Link>
                {
                    authorId === currentUser?.id && (
                        <div className="cursor-pointer">
                            {
                                deletePostStatus.isLoading || deleteCommentStatus.isLoading ? (
                                    <Spinner/>
                                ) : (
                                        <RiDeleteBinLine/>
                                )
                            }
                        </div>
                    )
                }
            </CardHeader>
            <CardBody className='px-3 py-2 mb-5'>
                <Typography>
                    {content}
                </Typography>
            </CardBody>
            {
                cardFor !== 'comment' && (
                    <CardFooter className='gap-3'>
                        <div className="flex gap-5 items-center">
                            
                        </div>
                    </CardFooter>
                )
            }
        </NextUiCard>
    )
}

export default Card
