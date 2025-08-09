import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useBoard } from '../context/BoardContext'

const BoardPostCard = ({ post }) => {
  const { likes, dislikes, comments, updateLikes, updateDislikes } = useBoard()
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')

  const likeCount = likes[post.id] || 0
  const dislikeCount = dislikes[post.id] || 0
  const commentCount = (comments[post.id] || []).length

  const handleAddComment = () => {
    if (newComment.trim()) {
      // 댓글 추가 로직은 상세 페이지에서 처리
      setNewComment('')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
      {/* 게시글 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-gray-600 font-semibold">
              {post.author.charAt(0)}
            </span>
          </div>
          <div>
            <Link 
              to={`/author/${post.author}`}
              className="text-sm font-medium text-gray-900 hover:text-blue-600"
            >
              {post.author}
            </Link>
            <div className="text-xs text-gray-500">
              {new Date(post.createdAt).toLocaleDateString('ko-KR')}
            </div>
          </div>
        </div>
        <div className="text-xs text-gray-500">
          조회 {post.viewCount}
        </div>
      </div>

      {/* 게시글 제목 */}
      <Link to={`/board/${post.id}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
          {post.title}
        </h3>
      </Link>

      {/* 게시글 내용 미리보기 */}
      <p className="text-gray-600 mb-4 line-clamp-3">
        {post.content.length > 150 
          ? `${post.content.substring(0, 150)}...` 
          : post.content
        }
      </p>

      {/* 게시글 액션 버튼 */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          {/* 추천 버튼 */}
          <button
            onClick={() => updateLikes(post.id)}
            className="flex items-center space-x-1 text-gray-500 hover:text-green-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            <span className="text-sm">{likeCount}</span>
          </button>

          {/* 비추천 버튼 */}
          <button
            onClick={() => updateDislikes(post.id)}
            className="flex items-center space-x-1 text-gray-500 hover:text-red-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v5a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2" />
            </svg>
            <span className="text-sm">{dislikeCount}</span>
          </button>

          {/* 댓글 버튼 */}
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-sm">{commentCount}</span>
          </button>
        </div>

        {/* 더보기 버튼 */}
        <Link 
          to={`/board/${post.id}`}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          더보기 →
        </Link>
      </div>

      {/* 댓글 섹션 (간단한 미리보기) */}
      {showComments && commentCount > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="space-y-2">
            {(comments[post.id] || []).slice(0, 2).map((comment) => (
              <div key={comment.id} className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs text-gray-600">
                    {comment.author.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">
                      {comment.author}
                    </span>
                    {comment.isAuthor && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        작성자
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{comment.content}</p>
                </div>
              </div>
            ))}
            {commentCount > 2 && (
              <div className="text-sm text-gray-500 text-center">
                댓글 {commentCount - 2}개 더보기
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default BoardPostCard
