import React from 'react'
import { Link } from 'react-router-dom'

const PortfolioCard = ({ portfolio }) => {
  // 숫자를 축약형으로 변환하는 함수
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  // 투자 기간 계산 (간결한 형식)
  const calculateInvestmentPeriod = () => {
    const sortedTrades = [...portfolio.trades].sort((a, b) => new Date(a.date) - new Date(b.date))
    const startDate = new Date(sortedTrades[0].date)
    const endDate = new Date(sortedTrades[sortedTrades.length - 1].date)
    
    const formatDate = (date) => {
      const year = date.getFullYear().toString().slice(-2) // 뒤 2자리만
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      return `${year}.${month}.${day}`
    }
    
    return {
      start: formatDate(startDate),
      end: formatDate(endDate)
    }
  }

  const investmentPeriod = calculateInvestmentPeriod()

  return (
    <Link to={`/portfolio/${portfolio.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6">
        {/* 포트폴리오 제목 */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {portfolio.title}
        </h3>
        
        {/* 작성자 */}
        <p className="text-sm text-gray-600 mb-4">
          작성자: {portfolio.author}
        </p>
        
        {/* 투자 기간 */}
        <div className="mb-4">
          <div className="text-xs text-gray-500 mb-1">투자 기간</div>
          <div className="text-xs text-gray-700">
            {investmentPeriod.start}~{investmentPeriod.end}
          </div>
        </div>
        
        {/* 투자 정보 */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-xs text-gray-500">
            <span>초기 투자금:</span>
            <span className="font-medium">₩{formatNumber(portfolio.initialValue)}</span>
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>최종 가치:</span>
            <span className="font-medium">₩{formatNumber(portfolio.finalValue)}</span>
          </div>
        </div>
        
        {/* 수익률 */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">수익률</span>
          <span className={`text-lg font-bold ${portfolio.return >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {portfolio.return >= 0 ? '+' : ''}{portfolio.return}%
          </span>
        </div>
        
        {/* 거래 수 */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex justify-between text-xs text-gray-500">
            <span>거래 수</span>
            <span>{portfolio.trades.length}건</span>
          </div>
        </div>
        
        {/* 작성일 */}
        <div className="mt-2 text-xs text-gray-400">
          {portfolio.createdAt}
        </div>
      </div>
    </Link>
  )
}

export default PortfolioCard

