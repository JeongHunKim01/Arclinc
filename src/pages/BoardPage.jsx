import React, { useState, useMemo } from 'react'
import { useBoard } from '../context/BoardContext'
import BoardPostCard from '../components/BoardPostCard'
import CreatePostModal from '../components/CreatePostModal'

const BoardPage = () => {
  const { posts, comments, likes, dislikes } = useBoard()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('trending')
  const [showTrendingTooltip, setShowTrendingTooltip] = useState(false)

  // 트렌딩 점수 계산 함수
  const calculateTrendingScore = (post) => {
    const postId = post.id
    const viewCount = post.viewCount || 0
    const likeCount = likes[postId] || 0
    const commentCount = (comments[postId] || []).length
    const dislikeCount = dislikes[postId] || 0

    // 인기도 점수 계산 (조회수 * 0.3 + 추천수 * 0.4 + 댓글수 * 0.3 - 비추천수 * 0.1)
    const popularityScore = (viewCount * 0.3) + (likeCount * 0.4) + (commentCount * 0.3) - (dislikeCount * 0.1)

    // 최근 활동도 보너스 (최근 30일 내 게시글에 보너스)
    const daysSinceCreation = Math.floor((new Date() - new Date(post.createdAt)) / (1000 * 60 * 60 * 24))
    const recencyBonus = Math.max(0, 30 - daysSinceCreation) * 2

    // 트렌딩 점수 = 인기도 + 최근 활동도 보너스
    const trendingScore = popularityScore + recencyBonus

    return {
      viewCount,
      likeCount,
      commentCount,
      dislikeCount,
      popularityScore,
      recencyBonus,
      trendingScore
    }
  }

  // 검색 및 정렬된 게시글
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // 정렬
    switch (sortBy) {
      case 'trending':
        return [...filtered].sort((a, b) => {
          const trendingA = calculateTrendingScore(a)
          const trendingB = calculateTrendingScore(b)
          return trendingB.trendingScore - trendingA.trendingScore
        })
      case 'latest':
        return [...filtered].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      case 'popular':
        return [...filtered].sort((a, b) => {
          const likesA = likes[a.id] || 0
          const likesB = likes[b.id] || 0
          const commentsA = (comments[a.id] || []).length
          const commentsB = (comments[b.id] || []).length
          return (likesB + commentsB) - (likesA + commentsA)
        })
      case 'title':
        return [...filtered].sort((a, b) => a.title.localeCompare(b.title))
      default:
        return filtered
    }
  }, [posts, searchTerm, sortBy, comments, likes, dislikes])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">자유게시판</h1>
        <p className="text-lg text-gray-600">
          투자 관련 이야기와 정보를 자유롭게 나누어보세요
        </p>
      </div>

      {/* 검색 및 정렬 섹션 */}
      <div className="mb-8 bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* 검색창 */}
          <div className="flex-1 w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="제목, 작성자, 내용으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* 정렬 옵션 */}
          <div className="w-full md:w-auto">
            <div className="flex items-center gap-1">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="trending">트렌딩</option>
                <option value="latest">최신순</option>
                <option value="popular">인기순</option>
                <option value="title">제목순</option>
              </select>

              {/* 트렌딩 설명 툴팁 버튼 */}
              {sortBy === 'trending' && (
                <div className="relative">
                  <button
                    onMouseEnter={() => setShowTrendingTooltip(true)}
                    onMouseLeave={() => setShowTrendingTooltip(false)}
                    className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {/* 툴팁 */}
                  {showTrendingTooltip && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap z-10">
                      <div className="text-center">
                        <div className="font-medium mb-1">트렌딩 순위 계산</div>
                        <div className="text-xs text-gray-300">
                          인기도(조회수, 추천수, 댓글수) + 최근 활동도를 종합한 순위입니다
                        </div>
                      </div>
                      {/* 화살표 */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 글쓰기 버튼 */}
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            글쓰기
          </button>
        </div>

        {/* 검색 결과 표시 */}
        {searchTerm.trim() && (
          <div className="mt-4 text-sm text-gray-600">
            "{searchTerm}" 검색 결과: {filteredAndSortedPosts.length}개의 게시글
          </div>
        )}
      </div>

      {/* 게시글 목록 */}
      <div className="space-y-4">
        {filteredAndSortedPosts.map((post) => (
          <BoardPostCard key={post.id} post={post} />
        ))}
      </div>

      {filteredAndSortedPosts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            {searchTerm.trim() ? '검색 결과가 없습니다' : '아직 게시글이 없습니다'}
          </h3>
          <p className="text-gray-500">
            {searchTerm.trim() ? '다른 검색어를 시도해보세요.' : '첫 번째 게시글을 작성해보세요!'}
          </p>
        </div>
      )}

      {/* 글쓰기 모달 */}
      {showCreateModal && (
        <CreatePostModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  )
}

export default BoardPage
