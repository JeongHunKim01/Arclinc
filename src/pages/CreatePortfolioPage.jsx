import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { usePortfolio } from '../context/PortfolioContext'

const CreatePortfolioPage = () => {
  const navigate = useNavigate()
  const { addPortfolio } = usePortfolio()
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    initialValue: '',
    finalValue: '',
    trades: []
  })
  
  const [currentTrade, setCurrentTrade] = useState({
    date: '',
    type: 'buy',
    ticker: '',
    shares: '',
    price: '',
    comment: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleTradeInputChange = (e) => {
    const { name, value } = e.target
    setCurrentTrade(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const addTrade = () => {
    if (currentTrade.ticker && currentTrade.shares && currentTrade.price) {
      const newTrade = {
        ...currentTrade,
        id: Date.now().toString(),
        shares: parseFloat(currentTrade.shares),
        price: parseFloat(currentTrade.price)
      }
      
      setFormData(prev => ({
        ...prev,
        trades: [...prev.trades, newTrade]
      }))
      
      setCurrentTrade({
        date: '',
        type: 'buy',
        ticker: '',
        shares: '',
        price: '',
        comment: ''
      })
    }
  }

  const removeTrade = (tradeId) => {
    setFormData(prev => ({
      ...prev,
      trades: prev.trades.filter(trade => trade.id !== tradeId)
    }))
  }

  const calculateReturn = () => {
    if (formData.initialValue && formData.finalValue) {
      const initial = parseFloat(formData.initialValue)
      const final = parseFloat(formData.finalValue)
      return ((final - initial) / initial * 100).toFixed(2)
    }
    return 0
  }

  const calculateSharpeRatio = () => {
    // 간단한 샤프 비율 계산 (실제로는 더 복잡한 계산이 필요)
    const returnValue = calculateReturn()
    return (parseFloat(returnValue) / 10).toFixed(2)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.title || !formData.author || !formData.initialValue || !formData.finalValue || formData.trades.length === 0) {
      alert('모든 필수 항목을 입력해주세요.')
      return
    }

    const portfolio = {
      ...formData,
      initialValue: parseFloat(formData.initialValue),
      finalValue: parseFloat(formData.finalValue),
      return: parseFloat(calculateReturn()),
      sharpeRatio: parseFloat(calculateSharpeRatio())
    }

    addPortfolio(portfolio)
    navigate('/')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="mb-8">
        <Link 
          to="/" 
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          홈으로 돌아가기
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">새 포트폴리오 만들기</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 기본 정보 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">기본 정보</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                포트폴리오 제목 *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="포트폴리오 제목을 입력하세요"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                작성자 *
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="작성자 이름"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                초기 투자금 (원) *
              </label>
              <input
                type="number"
                name="initialValue"
                value={formData.initialValue}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="10000000"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                최종 가치 (원) *
              </label>
              <input
                type="number"
                name="finalValue"
                value={formData.finalValue}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="14235600"
                required
              />
            </div>
          </div>
          
          {/* 수익률 미리보기 */}
          {formData.initialValue && formData.finalValue && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                예상 수익률: <span className="font-semibold">{calculateReturn()}%</span>
              </p>
            </div>
          )}
        </div>

        {/* 매매 내역 추가 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">매매 내역 추가</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">날짜</label>
              <input
                type="date"
                name="date"
                value={currentTrade.date}
                onChange={handleTradeInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">유형</label>
              <select
                name="type"
                value={currentTrade.type}
                onChange={handleTradeInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="buy">매수</option>
                <option value="sell">매도</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">종목코드</label>
              <input
                type="text"
                name="ticker"
                value={currentTrade.ticker}
                onChange={handleTradeInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="AAPL"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">수량</label>
              <input
                type="number"
                name="shares"
                value={currentTrade.shares}
                onChange={handleTradeInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">가격 (원)</label>
              <input
                type="number"
                name="price"
                value={currentTrade.price}
                onChange={handleTradeInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="180000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">코멘트</label>
              <input
                type="text"
                name="comment"
                value={currentTrade.comment}
                onChange={handleTradeInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="매매 이유를 입력하세요"
              />
            </div>
          </div>
          
          <button
            type="button"
            onClick={addTrade}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            매매 내역 추가
          </button>
        </div>

        {/* 추가된 매매 내역 */}
        {formData.trades.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">추가된 매매 내역</h3>
            <div className="space-y-2">
              {formData.trades.map((trade) => (
                <div key={trade.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 py-1 rounded text-sm font-medium ${
                      trade.type === 'buy' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {trade.type === 'buy' ? '매수' : '매도'}
                    </span>
                    <span className="font-medium">{trade.ticker}</span>
                    <span>{trade.shares}주</span>
                    <span>₩{trade.price.toLocaleString()}</span>
                    {trade.comment && <span className="text-gray-600">({trade.comment})</span>}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeTrade(trade.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 제출 버튼 */}
        <div className="flex justify-end space-x-4">
          <Link
            to="/"
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            취소
          </Link>
          <button
            type="submit"
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            포트폴리오 저장
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreatePortfolioPage

