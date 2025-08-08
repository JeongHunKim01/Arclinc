import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PortfolioProvider } from './context/PortfolioContext'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import PortfolioDetailPage from './pages/PortfolioDetailPage'
import CreatePortfolioPage from './pages/CreatePortfolioPage'
import AuthorProfilePage from './pages/AuthorProfilePage'
import DemoAd from './components/DemoAd'

const App = () => {
  return (
    <PortfolioProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Header />
          
          {/* 메인 콘텐츠 */}
          <div className="flex max-w-7xl mx-auto">
            {/* 좌측 광고 - 고정 위치 */}
            <div className="hidden lg:block w-64 p-4 sticky top-4 h-fit">
              <DemoAd position="side" />
            </div>

            {/* 중앙 콘텐츠 */}
            <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/portfolio/:id" element={<PortfolioDetailPage />} />
                <Route path="/create" element={<CreatePortfolioPage />} />
                <Route path="/author/:authorName" element={<AuthorProfilePage />} />
              </Routes>
            </div>

            {/* 우측 광고 - 고정 위치 */}
            <div className="hidden lg:block w-64 p-4 sticky top-4 h-fit">
              <DemoAd position="side" />
            </div>
          </div>
        </div>
      </BrowserRouter>
    </PortfolioProvider>
  )
}

export default App

