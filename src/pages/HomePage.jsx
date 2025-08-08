import React from 'react'
import { Link } from 'react-router-dom'
import { usePortfolio } from '../context/PortfolioContext'
import PortfolioCard from '../components/PortfolioCard'

const HomePage = () => {
  const { portfolios } = usePortfolio()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="text-center mb-8">
        <p className="text-lg text-gray-600 mb-6">
          투자 포트폴리오를 공유하고 다른 투자자들과 소통하세요
        </p>
      </div>

      {/* 포트폴리오 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolios.map((portfolio) => (
          <PortfolioCard key={portfolio.id} portfolio={portfolio} />
        ))}
      </div>

      {portfolios.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📊</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            아직 포트폴리오가 없습니다
          </h3>
          <p className="text-gray-500">
            첫 번째 포트폴리오를 만들어보세요!
          </p>
        </div>
      )}
    </div>
  )
}

export default HomePage

