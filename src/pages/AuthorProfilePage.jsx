import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { usePortfolio } from '../context/PortfolioContext'
import PortfolioCard from '../components/PortfolioCard'

const AuthorProfilePage = () => {
  const { authorName } = useParams()
  const { portfolios } = usePortfolio()
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const [modalData, setModalData] = useState([])
  
  // 해당 작성자의 포트폴리오들 필터링
  const authorPortfolios = portfolios.filter(portfolio => portfolio.author === authorName)
  
  // 작성자 프로필 정보 (더미 데이터)
  const authorProfile = {
    name: authorName,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${authorName}`,
    bio: `${authorName}님의 투자 포트폴리오입니다. 다양한 투자 전략과 분석을 공유합니다.`,
    followers: Math.floor(Math.random() * 1000) + 100,
    following: Math.floor(Math.random() * 500) + 50,
    portfolios: authorPortfolios.length,
    totalReturn: authorPortfolios.reduce((sum, portfolio) => sum + portfolio.return, 0) / authorPortfolios.length || 0,
    joinDate: '2024년 1월',
    socialLinks: {
      github: Math.random() > 0.5 ? `https://github.com/${authorName.toLowerCase()}` : null,
      youtube: Math.random() > 0.5 ? `https://youtube.com/@${authorName.toLowerCase()}` : null,
      twitter: Math.random() > 0.5 ? `https://twitter.com/${authorName.toLowerCase()}` : null
    }
  }

  // 더미 팔로워/팔로잉 데이터 생성
  const generateFollowers = () => {
    const names = ['김투자', '이주식', '박펀드', '최ETF', '정채권', '강원자', '윤부동산', '임크립토', '한골드', '서실버']
    return names.slice(0, Math.floor(Math.random() * 8) + 3).map((name, index) => ({
      id: index + 1,
      name: name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      bio: `${name}님의 투자 포트폴리오입니다.`,
      followers: Math.floor(Math.random() * 500) + 50,
      portfolios: Math.floor(Math.random() * 8) + 1
    }))
  }

  const generateFollowing = () => {
    const names = ['투자마스터', '주식고수', '펀드킹', 'ETF전문가', '채권왕', '원자재맨', '부동산프로', '크립토마스터', '골드러버', '실버팬']
    return names.slice(0, Math.floor(Math.random() * 6) + 2).map((name, index) => ({
      id: index + 1,
      name: name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      bio: `${name}님의 투자 포트폴리오입니다.`,
      followers: Math.floor(Math.random() * 1000) + 100,
      portfolios: Math.floor(Math.random() * 10) + 2
    }))
  }

  const handleStatClick = (type) => {
    setModalType(type)
    if (type === 'followers') {
      setModalData(generateFollowers())
    } else if (type === 'following') {
      setModalData(generateFollowing())
    } else if (type === 'portfolios') {
      setModalData(authorPortfolios)
    }
    setShowModal(true)
  }

  if (authorPortfolios.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">작성자를 찾을 수 없습니다</h2>
        <Link to="/" className="text-primary-600 hover:text-primary-700">
          홈으로 돌아가기
        </Link>
      </div>
    )
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

      {/* 작성자 프로필 헤더 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center space-x-6">
          {/* 프로필 사진 */}
          <img 
            src={authorProfile.avatar} 
            alt={authorProfile.name}
            className="w-24 h-24 rounded-full border-4 border-gray-200"
          />
          
          {/* 작성자 정보 */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{authorProfile.name}</h1>
            <p className="text-lg text-gray-600 mb-4">{authorProfile.bio}</p>
            
            {/* 통계 */}
            <div className="flex space-x-6 text-sm text-gray-500 mb-4">
              <button 
                onClick={() => handleStatClick('followers')}
                className="hover:text-blue-600 transition-colors cursor-pointer"
              >
                <span className="font-semibold text-gray-900">{authorProfile.followers.toLocaleString()}</span>
                <span className="ml-1">팔로워</span>
              </button>
              <button 
                onClick={() => handleStatClick('following')}
                className="hover:text-blue-600 transition-colors cursor-pointer"
              >
                <span className="font-semibold text-gray-900">{authorProfile.following.toLocaleString()}</span>
                <span className="ml-1">팔로잉</span>
              </button>
              <button 
                onClick={() => handleStatClick('portfolios')}
                className="hover:text-blue-600 transition-colors cursor-pointer"
              >
                <span className="font-semibold text-gray-900">{authorProfile.portfolios}</span>
                <span className="ml-1">포트폴리오</span>
              </button>
              <div>
                <span className={`font-semibold ${authorProfile.totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {authorProfile.totalReturn >= 0 ? '+' : ''}{authorProfile.totalReturn.toFixed(1)}%
                </span>
                <span className="ml-1">평균 수익률</span>
              </div>
            </div>
            
            {/* 가입일 */}
            <p className="text-sm text-gray-500">가입일: {authorProfile.joinDate}</p>
          </div>
          
          {/* 소셜 링크 */}
          <div className="flex space-x-3">
            {authorProfile.socialLinks.github && (
              <a 
                href={authorProfile.socialLinks.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            )}
            
            {authorProfile.socialLinks.youtube && (
              <a 
                href={authorProfile.socialLinks.youtube} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            )}
            
            {authorProfile.socialLinks.twitter && (
              <a 
                href={authorProfile.socialLinks.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* 포트폴리오 목록 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {authorProfile.name}님의 포트폴리오 ({authorPortfolios.length}개)
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authorPortfolios.map((portfolio) => (
            <PortfolioCard key={portfolio.id} portfolio={portfolio} />
          ))}
        </div>

        {authorPortfolios.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              아직 포트폴리오가 없습니다
            </h3>
            <p className="text-gray-500">
              {authorProfile.name}님이 작성한 포트폴리오가 없습니다.
            </p>
          </div>
        )}
      </div>

      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {modalType === 'followers' && '팔로워'}
                {modalType === 'following' && '팔로잉'}
                {modalType === 'portfolios' && '포트폴리오'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {modalType === 'followers' || modalType === 'following' ? (
                modalData.map((user) => (
                  <div key={user.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-12 h-12 rounded-full border-2 border-gray-200"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.bio}</p>
                      <div className="flex space-x-4 text-xs text-gray-500 mt-1">
                        <span>팔로워 {user.followers.toLocaleString()}</span>
                        <span>포트폴리오 {user.portfolios}개</span>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      팔로우
                    </button>
                  </div>
                ))
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {modalData.map((portfolio) => (
                    <PortfolioCard key={portfolio.id} portfolio={portfolio} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AuthorProfilePage
