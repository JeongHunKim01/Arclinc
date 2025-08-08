import React from 'react'

const DemoAd = ({ position = 'side', size = 'medium' }) => {
  const adContents = [
    {
      title: '투자 정보 플랫폼',
      description: '실시간 주식 시세와 투자 전략을 제공하는 최고의 플랫폼입니다. 전문가들의 분석과 투자 조언을 받아보세요.',
      cta: '지금 시작하기',
      color: 'bg-blue-500'
    },
    {
      title: '금융 상품 추천',
      description: '최고의 수익률을 위한 맞춤형 금융 상품을 추천해드립니다. 개인 상황에 맞는 최적의 투자 방안을 제시합니다.',
      cta: '상품 보기',
      color: 'bg-green-500'
    },
    {
      title: '투자 교육 프로그램',
      description: '초보자를 위한 체계적인 투자 교육 프로그램입니다. 기초부터 고급까지 단계별 학습이 가능합니다.',
      cta: '무료 체험',
      color: 'bg-purple-500'
    },
    {
      title: '포트폴리오 분석 도구',
      description: 'AI 기반 포트폴리오 최적화 도구입니다. 리스크 분석과 수익률 예측을 통해 최적의 포트폴리오를 구성하세요.',
      cta: '분석 시작',
      color: 'bg-orange-500'
    }
  ]

  const randomAd = adContents[Math.floor(Math.random() * adContents.length)]

  if (position === 'top' || position === 'bottom') {
    return (
      <div className="w-full bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 mb-4">
        <div className="text-center">
          <div className="text-sm text-gray-500 mb-2">광고</div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold text-lg mb-2">{randomAd.title}</h3>
            <p className="text-gray-600 mb-3">{randomAd.description}</p>
            <button className={`${randomAd.color} text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90`}>
              {randomAd.cta}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 h-full min-h-[500px]">
      <div className="text-center h-full flex flex-col justify-center">
        <div className="text-sm text-gray-500 mb-4">광고</div>
        <div className="bg-white rounded-lg p-4 shadow-sm flex-1 flex flex-col justify-center">
          <h4 className="font-semibold text-lg mb-3">{randomAd.title}</h4>
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">{randomAd.description}</p>
          <button className={`${randomAd.color} text-white px-4 py-2 rounded text-sm font-medium hover:opacity-90`}>
            {randomAd.cta}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DemoAd
