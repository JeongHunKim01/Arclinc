import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState('login') // 'login' or 'register'

  const handleLogin = (e) => {
    e.preventDefault()
    // 간단한 로그인 로직 (실제로는 서버와 연동)
    setIsLoggedIn(true)
    setShowAuthModal(false)
  }

  const handleRegister = (e) => {
    e.preventDefault()
    // 간단한 회원가입 로직 (실제로는 서버와 연동)
    setIsLoggedIn(true)
    setShowAuthModal(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  const handleGoogleAuth = () => {
    // 구글 연동 로직 (더미)
    alert('구글 연동 기능은 데모 버전에서 지원되지 않습니다.')
  }

  const handleNaverAuth = () => {
    // 네이버 연동 로직 (더미)
    alert('네이버 연동 기능은 데모 버전에서 지원되지 않습니다.')
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-bold text-blue-600">Arclinc</div>
          </Link>

          {/* 인증 버튼 */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">안녕하세요!</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                로그인
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 인증 모달 */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {authMode === 'login' ? '로그인' : '회원가입'}
              </h2>
              <button
                onClick={() => setShowAuthModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={authMode === 'login' ? handleLogin : handleRegister}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    이메일
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="이메일을 입력하세요"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    비밀번호
                  </label>
                  <input
                    type="password"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="비밀번호를 입력하세요"
                  />
                </div>
                {authMode === 'register' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      비밀번호 확인
                    </label>
                    <input
                      type="password"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="비밀번호를 다시 입력하세요"
                    />
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium"
                >
                  {authMode === 'login' ? '로그인' : '회원가입'}
                </button>
              </div>
            </form>

            {/* 구분선 */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">또는</span>
              </div>
            </div>

            {/* 소셜 로그인 버튼들 */}
            <div className="space-y-3">
              <button
                onClick={handleGoogleAuth}
                className="w-full flex items-center justify-center space-x-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Google로 {authMode === 'login' ? '로그인' : '회원가입'}</span>
              </button>
              
              <button
                onClick={handleNaverAuth}
                className="w-full flex items-center justify-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z"/>
                </svg>
                <span>네이버로 {authMode === 'login' ? '로그인' : '회원가입'}</span>
              </button>
            </div>

            <div className="mt-4 text-center">
              <button
                onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                {authMode === 'login' ? '계정이 없으신가요? 회원가입' : '이미 계정이 있으신가요? 로그인'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
