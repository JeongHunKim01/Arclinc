import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { usePortfolio } from '../context/PortfolioContext'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const PortfolioDetailPage = () => {
  const { id } = useParams()
  const { 
    getPortfolioById, 
    getCommentsByPortfolioId, 
    getLikesByPortfolioId, 
    getDislikesByPortfolioId,
    addComment,
    updateLikes,
    updateDislikes
  } = usePortfolio()
  
  const portfolio = getPortfolioById(id)
  const comments = getCommentsByPortfolioId(id)
  const likes = getLikesByPortfolioId(id)
  const dislikes = getDislikesByPortfolioId(id)
  
  const [newComment, setNewComment] = useState('')

  if (!portfolio) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">포트폴리오를 찾을 수 없습니다</h2>
        <Link to="/" className="text-primary-600 hover:text-primary-700">
          홈으로 돌아가기
        </Link>
      </div>
    )
  }

  const handleSubmitComment = (e) => {
    e.preventDefault()
    if (newComment.trim()) {
      addComment(id, newComment.trim())
      setNewComment('')
    }
  }

  // 투자 기간 계산 (날짜 정렬 후 계산)
  const sortedTrades = [...portfolio.trades].sort((a, b) => new Date(a.date) - new Date(b.date))
  const startDate = new Date(sortedTrades[0].date)
  const endDate = new Date(sortedTrades[sortedTrades.length - 1].date)
  const daysDiff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1

  // 투자 기간 포맷팅 (간결한 형식)
  const formatDate = (date) => {
    const year = date.getFullYear().toString().slice(-2) // 뒤 2자리만
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}.${month}.${day}`
  }

  const investmentPeriod = {
    start: formatDate(startDate),
    end: formatDate(endDate)
  }

  // 작성자 프로필 정보 (더미 데이터)
  const authorProfile = {
    name: portfolio.author,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${portfolio.author}`,
    bio: `${portfolio.author}님의 투자 포트폴리오입니다.`,
    followers: Math.floor(Math.random() * 1000) + 100,
    following: Math.floor(Math.random() * 500) + 50,
    portfolios: Math.floor(Math.random() * 10) + 1,
    socialLinks: {
      github: Math.random() > 0.5 ? `https://github.com/${portfolio.author.toLowerCase()}` : null,
      youtube: Math.random() > 0.5 ? `https://youtube.com/@${portfolio.author.toLowerCase()}` : null,
      twitter: Math.random() > 0.5 ? `https://twitter.com/${portfolio.author.toLowerCase()}` : null
    }
  }

  // 차트 데이터 생성 (더 굴곡진 형태)
  const chartData = sortedTrades.map((trade, index) => {
    const tradeDate = new Date(trade.date)
    // 포트폴리오의 최종 수익률을 거래 개수로 나누어 각 거래별 수익률 계산
    const returnPerTrade = portfolio.return / sortedTrades.length
    let cumulativeReturn = returnPerTrade * (index + 1)
    
    // 굴곡을 추가하기 위해 랜덤 변동 추가
    const variation = (Math.random() - 0.5) * 10 // -5% ~ +5% 변동
    cumulativeReturn += variation
    
    return {
      name: `${tradeDate.getMonth() + 1}월 ${tradeDate.getDate()}일`,
      value: cumulativeReturn,
      date: trade.date
    }
  })

  // 랜덤 날짜 생성 함수
  const generateRandomDate = (baseDate) => {
    const base = new Date(baseDate)
    const randomDays = Math.floor(Math.random() * 30) + 1 // 1-30일 랜덤
    const randomDate = new Date(base)
    randomDate.setDate(base.getDate() + randomDays)
    return randomDate.toISOString().split('T')[0]
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 뒤로가기 버튼 */}
      <Link 
        to="/" 
        className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        홈으로 돌아가기
      </Link>

      {/* 포트폴리오 헤더 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{portfolio.title}</h1>
            <p className="text-gray-600">작성일: {portfolio.createdAt}</p>
          </div>
        </div>

        {/* 작성자 프로필 */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-4">
            {/* 프로필 사진 */}
            <Link to={`/author/${portfolio.author}`} className="hover:opacity-80 transition-opacity">
              <img 
                src={authorProfile.avatar} 
                alt={authorProfile.name}
                className="w-16 h-16 rounded-full border-2 border-gray-200 cursor-pointer"
              />
            </Link>
            
            {/* 작성자 정보 */}
            <div className="flex-1">
              <Link to={`/author/${portfolio.author}`} className="hover:text-blue-600 transition-colors">
                <h3 className="text-lg font-semibold text-gray-900 cursor-pointer">{authorProfile.name}</h3>
              </Link>
              <p className="text-sm text-gray-600 mb-2">{authorProfile.bio}</p>
              
              {/* 통계 */}
              <div className="flex space-x-4 text-sm text-gray-500">
                <span>팔로워 {authorProfile.followers.toLocaleString()}</span>
                <span>팔로잉 {authorProfile.following.toLocaleString()}</span>
                <span>포트폴리오 {authorProfile.portfolios}개</span>
              </div>
            </div>
            
            {/* 소셜 링크 */}
            <div className="flex space-x-2">
              {authorProfile.socialLinks.github && (
                <a 
                  href={authorProfile.socialLinks.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              )}
              
              {authorProfile.socialLinks.youtube && (
                <a 
                  href={authorProfile.socialLinks.youtube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              )}
              
              {authorProfile.socialLinks.twitter && (
                <a 
                  href={authorProfile.socialLinks.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* 투자 기간 */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">투자 기간</h3>
          <p className="text-gray-700">
            {investmentPeriod.start}~{investmentPeriod.end}
          </p>
          <p className="text-sm text-gray-500 mt-1">총 {daysDiff}일</p>
        </div>

        {/* 포트폴리오 요약 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">초기 투자금</p>
            <p className="text-lg font-semibold">₩{portfolio.initialValue.toLocaleString()}</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">최종 가치</p>
            <p className="text-lg font-semibold">₩{portfolio.finalValue.toLocaleString()}</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">수익률</p>
            <p className={`text-lg font-semibold ${portfolio.return >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {portfolio.return >= 0 ? '+' : ''}{portfolio.return}%
            </p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">거래 수</p>
            <p className="text-lg font-semibold">{portfolio.trades.length}건</p>
          </div>
        </div>

        {/* 차트 */}
        <div className="h-64 mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value.toFixed(1)}%`, '수익률']} />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 매매 내역 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">매매 내역</h2>
        <div className="space-y-4">
          {portfolio.trades.map((trade) => (
            <div key={trade.id} className="border-b pb-4">
              {/* 메인 정보 행 */}
              <div className="grid grid-cols-5 gap-4 mb-2">
                <div className="text-sm whitespace-nowrap">{trade.date}</div>
                <div>
                  <span className={`px-3 py-1 rounded text-sm font-medium ${
                    trade.type === 'buy' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {trade.type === 'buy' ? '매수' : '매도'}
                  </span>
                </div>
                <div className="font-medium text-sm">{trade.ticker}</div>
                <div className="text-sm">{trade.shares.toLocaleString()}</div>
                <div className="text-sm">₩{trade.price.toLocaleString()}</div>
              </div>
              {/* 코멘트 행 */}
              <div className="text-xs text-gray-600 mb-2">{trade.comment}</div>
              {/* 최종 수정일자 */}
              <div className="text-xs text-gray-400">최종 수정일자: {generateRandomDate(trade.date)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 추천/비추천 버튼 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => updateLikes(id)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            <span>추천 {likes}</span>
          </button>
          <button
            onClick={() => updateDislikes(id)}
            className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2" />
            </svg>
            <span>비추천 {dislikes}</span>
          </button>
        </div>
      </div>

      {/* 댓글 섹션 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">댓글</h2>
        
        {/* 댓글 작성 폼 */}
        <form onSubmit={handleSubmitComment} className="mb-6">
          <div className="flex space-x-4">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="댓글을 입력하세요..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              작성
            </button>
          </div>
        </form>

        {/* 댓글 목록 */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b pb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">{comment.author}</span>
                  {comment.isAuthor && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                      작성자
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-500">{comment.createdAt}</span>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))}
          
          {comments.length === 0 && (
            <p className="text-gray-500 text-center py-4">아직 댓글이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default PortfolioDetailPage

