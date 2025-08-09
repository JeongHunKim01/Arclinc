import React, { createContext, useContext, useReducer, useEffect } from 'react'

const PortfolioContext = createContext()

const initialState = {
  portfolios: [],
  comments: {},
  likes: {},
  dislikes: {}
}

const portfolioReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PORTFOLIOS':
      return { ...state, portfolios: action.payload }
    case 'ADD_PORTFOLIO':
      return { ...state, portfolios: [action.payload, ...state.portfolios] }
    case 'ADD_COMMENT':
      const portfolioId = action.payload.portfolioId
      const existingComments = state.comments[portfolioId] || []
      return {
        ...state,
        comments: {
          ...state.comments,
          [portfolioId]: [...existingComments, action.payload.comment]
        }
      }
    case 'UPDATE_LIKES':
      return {
        ...state,
        likes: {
          ...state.likes,
          [action.payload.portfolioId]: action.payload.count
        }
      }
    case 'UPDATE_DISLIKES':
      return {
        ...state,
        dislikes: {
          ...state.dislikes,
          [action.payload.portfolioId]: action.payload.count
        }
      }
    default:
      return state
  }
}

export const PortfolioProvider = ({ children }) => {
  const [state, dispatch] = useReducer(portfolioReducer, initialState)

  // localStorage에서 데이터 로드
  useEffect(() => {
    // 강제로 더미 데이터 로드 (개발용)
    localStorage.clear()
    
    const savedPortfolios = localStorage.getItem('portfolios')
    const savedComments = localStorage.getItem('comments')
    const savedLikes = localStorage.getItem('likes')
    const savedDislikes = localStorage.getItem('dislikes')

    if (savedPortfolios) {
      dispatch({ type: 'SET_PORTFOLIOS', payload: JSON.parse(savedPortfolios) })
    } else {
      // 더미 데이터로 초기화
      const dummyPortfolios = [
        {
          id: '1',
          author: '테크마스터',
          title: 'AI 반도체 중심 포트폴리오',
          initialValue: 10000000,
          finalValue: 15800000,
          return: 58.0,
          sharpeRatio: 1.85,
          createdAt: '2024-02-15',
          trades: [
            {
              id: '1-1',
              date: '2024-02-15',
              type: 'buy',
              ticker: 'NVDA',
              shares: 100,
              price: 450.00,
              comment: 'AI 반도체 시장의 급성장세를 타고 NVIDIA 매수'
            },
            {
              id: '1-2',
              date: '2024-01-20',
              type: 'buy',
              ticker: 'AMD',
              shares: 200,
              price: 120.00,
              comment: 'AMD도 AI 시장에서 좋은 성과를 보일 것으로 예상'
            },
            {
              id: '1-3',
              date: '2024-01-10',
              type: 'buy',
              ticker: 'TSMC',
              shares: 150,
              price: 85.00,
              comment: '반도체 파운드리 시장의 선두주자 TSMC 투자'
            },
            {
              id: '1-4',
              date: '2024-02-01',
              type: 'sell',
              ticker: 'INTC',
              shares: 80,
              price: 45.00,
              comment: '인텔의 경쟁력 약화로 인한 매도'
            },
            {
              id: '1-5',
              date: '2024-02-10',
              type: 'buy',
              ticker: 'ASML',
              shares: 50,
              price: 750.00,
              comment: '반도체 장비업계의 핵심 기업 ASML 매수'
            },
            {
              id: '1-6',
              date: '2024-02-12',
              type: 'buy',
              ticker: 'AVGO',
              shares: 100,
              price: 180.00,
              comment: 'Broadcom의 네트워킹 칩 성장세'
            },
            {
              id: '1-7',
              date: '2024-02-14',
              type: 'sell',
              ticker: 'MU',
              shares: 200,
              price: 85.00,
              comment: '메모리 반도체 시장 불확실성으로 매도'
            }
          ]
        },
        {
          id: '2',
          author: '벤처투자자',
          title: '성장주 포트폴리오',
          initialValue: 5000000,
          finalValue: 7250000,
          return: 45.0,
          sharpeRatio: 1.8,
          createdAt: '2024-01-15',
          trades: [
            {
              id: '2-1',
              date: '2024-01-15',
              type: 'buy',
              ticker: 'TSLA',
              shares: 100,
              price: 200.00,
              comment: '전기차 시장의 선두주자 테슬라 매수'
            },
            {
              id: '2-2',
              date: '2024-01-25',
              type: 'buy',
              ticker: 'PLTR',
              shares: 300,
              price: 15.00,
              comment: '데이터 분석 플랫폼 Palantir 투자'
            },
            {
              id: '2-3',
              date: '2024-02-05',
              type: 'buy',
              ticker: 'SNOW',
              shares: 150,
              price: 180.00,
              comment: '클라우드 데이터 웨어하우스 Snowflake 매수'
            },
            {
              id: '2-4',
              date: '2024-02-12',
              type: 'sell',
              ticker: 'UBER',
              shares: 200,
              price: 35.00,
              comment: '수익성 개선이 더딘 우버 매도'
            },
            {
              id: '2-5',
              date: '2024-02-14',
              type: 'buy',
              ticker: 'CRWD',
              shares: 100,
              price: 250.00,
              comment: '사이버보안 시장의 성장주 CrowdStrike 투자'
            },
            {
              id: '2-6',
              date: '2024-02-16',
              type: 'buy',
              ticker: 'ZM',
              shares: 200,
              price: 120.00,
              comment: '원격회의 플랫폼 줌의 지속적 성장'
            },
            {
              id: '2-7',
              date: '2024-02-18',
              type: 'sell',
              ticker: 'SNAP',
              shares: 150,
              price: 12.00,
              comment: '스냅챗의 광고 수익 모델 한계로 매도'
            },
            {
              id: '2-8',
              date: '2024-02-20',
              type: 'buy',
              ticker: 'SHOP',
              shares: 100,
              price: 80.00,
              comment: '전자상거래 플랫폼 Shopify의 회복세'
            }
          ]
        },
        {
          id: '3',
          author: '배당투자자',
          title: '안정적 배당 포트폴리오',
          initialValue: 8000000,
          finalValue: 9200000,
          return: 15.0,
          sharpeRatio: 0.95,
          createdAt: '2024-01-20',
          trades: [
            {
              id: '3-1',
              date: '2024-01-20',
              type: 'buy',
              ticker: 'JNJ',
              shares: 100,
              price: 160.00,
              comment: '안정적인 배당과 성장을 보이는 존슨앤존슨'
            },
            {
              id: '3-2',
              date: '2024-01-25',
              type: 'buy',
              ticker: 'PG',
              shares: 150,
              price: 140.00,
              comment: '소비재 대표주자 P&G 매수'
            },
            {
              id: '3-3',
              date: '2024-02-01',
              type: 'buy',
              ticker: 'KO',
              shares: 200,
              price: 55.00,
              comment: '코카콜라의 안정적인 배당 수익'
            },
            {
              id: '3-4',
              date: '2024-02-08',
              type: 'buy',
              ticker: 'VZ',
              shares: 300,
              price: 35.00,
              comment: '통신사 버라이즌의 높은 배당률'
            },
            {
              id: '3-5',
              date: '2024-02-15',
              type: 'buy',
              ticker: 'XOM',
              shares: 100,
              price: 95.00,
              comment: '에너지 섹터의 대표주자 엑슨모빌'
            },
            {
              id: '3-6',
              date: '2024-02-18',
              type: 'buy',
              ticker: 'T',
              shares: 400,
              price: 25.00,
              comment: 'AT&T의 안정적인 배당 수익'
            },
            {
              id: '3-7',
              date: '2024-02-20',
              type: 'sell',
              ticker: 'IBM',
              shares: 80,
              price: 140.00,
              comment: 'IBM의 클라우드 전환 지연으로 매도'
            }
          ]
        },
        {
          id: '4',
          author: '소셜트레이더',
          title: '소셜미디어 트렌드 포트폴리오',
          initialValue: 3000000,
          finalValue: 4200000,
          return: 40.0,
          sharpeRatio: 1.2,
          createdAt: '2024-02-01',
          trades: [
            {
              id: '4-1',
              date: '2024-02-01',
              type: 'buy',
              ticker: 'META',
              shares: 50,
              price: 350.00,
              comment: '메타버스와 AI 기술로 성장하는 페이스북'
            },
            {
              id: '4-2',
              date: '2024-02-05',
              type: 'buy',
              ticker: 'SNAP',
              shares: 200,
              price: 12.00,
              comment: '젊은층을 타겟으로 하는 스냅챗'
            },
            {
              id: '4-3',
              date: '2024-02-10',
              type: 'buy',
              ticker: 'PINS',
              shares: 150,
              price: 25.00,
              comment: 'Pinterest의 광고 수익 모델 개선'
            },
            {
              id: '4-4',
              date: '2024-02-12',
              type: 'sell',
              ticker: 'TWTR',
              shares: 100,
              price: 45.00,
              comment: '엑스(구 트위터)의 불확실성으로 인한 매도'
            },
            {
              id: '4-5',
              date: '2024-02-14',
              type: 'buy',
              ticker: 'BMBL',
              shares: 300,
              price: 15.00,
              comment: '데이팅 앱 Bumble의 성장 가능성'
            },
            {
              id: '4-6',
              date: '2024-02-16',
              type: 'buy',
              ticker: 'SPOT',
              shares: 100,
              price: 180.00,
              comment: '음악 스트리밍 플랫폼 스포티파이'
            },
            {
              id: '4-7',
              date: '2024-02-18',
              type: 'sell',
              ticker: 'SNAP',
              shares: 100,
              price: 11.00,
              comment: '스냅챗의 수익성 악화로 일부 매도'
            },
            {
              id: '4-8',
              date: '2024-02-20',
              type: 'buy',
              ticker: 'MTCH',
              shares: 200,
              price: 45.00,
              comment: '데이팅 앱 시장의 선두주자 매치그룹'
            }
          ]
        },
        {
          id: '5',
          author: '바이오투자자',
          title: '바이오테크 혁신 포트폴리오',
          initialValue: 6000000,
          finalValue: 8400000,
          return: 40.0,
          sharpeRatio: 1.1,
          createdAt: '2024-01-25',
          trades: [
            {
              id: '5-1',
              date: '2024-01-25',
              type: 'buy',
              ticker: 'MRNA',
              shares: 100,
              price: 120.00,
              comment: 'mRNA 기술의 선두주자 모더나'
            },
            {
              id: '5-2',
              date: '2024-02-01',
              type: 'buy',
              ticker: 'BNTX',
              shares: 150,
              price: 90.00,
              comment: '바이오텍의 혁신적인 치료제 파이프라인'
            },
            {
              id: '5-3',
              date: '2024-02-05',
              type: 'buy',
              ticker: 'GILD',
              shares: 200,
              price: 75.00,
              comment: 'HIV 치료제로 유명한 길리어드 사이언스'
            },
            {
              id: '5-4',
              date: '2024-02-10',
              type: 'buy',
              ticker: 'REGN',
              shares: 100,
              price: 800.00,
              comment: '면역학 치료제의 선두주자 리제네론'
            },
            {
              id: '5-5',
              date: '2024-02-15',
              type: 'sell',
              ticker: 'JNJ',
              shares: 50,
              price: 165.00,
              comment: '일부 수익 실현을 위한 매도'
            },
            {
              id: '5-6',
              date: '2024-02-18',
              type: 'buy',
              ticker: 'AMGN',
              shares: 80,
              price: 250.00,
              comment: '바이오테크 대기업 암젠의 혁신적 치료제'
            },
            {
              id: '5-7',
              date: '2024-02-20',
              type: 'buy',
              ticker: 'VRTX',
              shares: 120,
              price: 300.00,
              comment: '낭포성 섬유증 치료제의 선두주자 버텍스'
            }
          ]
        },
        {
          id: '6',
          author: '금융전문가',
          title: '금융주 중심 포트폴리오',
          initialValue: 12000000,
          finalValue: 13800000,
          return: 15.0,
          sharpeRatio: 0.8,
          createdAt: '2024-01-30',
          trades: [
            {
              id: '6-1',
              date: '2024-01-30',
              type: 'buy',
              ticker: 'JPM',
              shares: 100,
              price: 150.00,
              comment: '미국 최대 은행 JP모건 체이스'
            },
            {
              id: '6-2',
              date: '2024-02-01',
              type: 'buy',
              ticker: 'BAC',
              shares: 200,
              price: 35.00,
              comment: '미국은행의 안정적인 수익 구조'
            },
            {
              id: '6-3',
              date: '2024-02-05',
              type: 'buy',
              ticker: 'WFC',
              shares: 150,
              price: 45.00,
              comment: '웰스파고의 디지털 전환 성과'
            },
            {
              id: '6-4',
              date: '2024-02-10',
              type: 'buy',
              ticker: 'GS',
              shares: 80,
              price: 380.00,
              comment: '골드만삭스의 투자은행 사업'
            },
            {
              id: '6-5',
              date: '2024-02-15',
              type: 'sell',
              ticker: 'C',
              shares: 100,
              price: 50.00,
              comment: '시티그룹의 구조조정 불확실성으로 매도'
            },
            {
              id: '6-6',
              date: '2024-02-18',
              type: 'buy',
              ticker: 'MS',
              shares: 120,
              price: 85.00,
              comment: '모건스탠리의 자산관리 사업 성장'
            },
            {
              id: '6-7',
              date: '2024-02-20',
              type: 'buy',
              ticker: 'BLK',
              shares: 60,
              price: 750.00,
              comment: '세계 최대 자산관리사 블랙록'
            }
          ]
        },
        {
          id: '7',
          author: '소비재전문가',
          title: '소비재 브랜드 포트폴리오',
          initialValue: 7000000,
          finalValue: 8400000,
          return: 20.0,
          sharpeRatio: 1.0,
          createdAt: '2024-02-05',
          trades: [
            {
              id: '7-1',
              date: '2024-02-05',
              type: 'buy',
              ticker: 'NKE',
              shares: 100,
              price: 120.00,
              comment: '스포츠 브랜드의 대표주자 나이키'
            },
            {
              id: '7-2',
              date: '2024-02-08',
              type: 'buy',
              ticker: 'SBUX',
              shares: 150,
              price: 95.00,
              comment: '글로벌 커피 체인 스타벅스'
            },
            {
              id: '7-3',
              date: '2024-02-10',
              type: 'buy',
              ticker: 'MCD',
              shares: 200,
              price: 280.00,
              comment: '패스트푸드 업계 1위 맥도날드'
            },
            {
              id: '7-4',
              date: '2024-02-12',
              type: 'buy',
              ticker: 'DIS',
              shares: 100,
              price: 90.00,
              comment: '엔터테인먼트 대기업 디즈니'
            },
            {
              id: '7-5',
              date: '2024-02-15',
              type: 'sell',
              ticker: 'YUM',
              shares: 80,
              price: 120.00,
              comment: '야미브랜드의 성장 둔화로 매도'
            },
            {
              id: '7-6',
              date: '2024-02-18',
              type: 'buy',
              ticker: 'HD',
              shares: 80,
              price: 350.00,
              comment: '홈디포의 DIY 시장 지배력'
            },
            {
              id: '7-7',
              date: '2024-02-20',
              type: 'buy',
              ticker: 'COST',
              shares: 60,
              price: 500.00,
              comment: '코스트코의 회원제 모델 성공'
            }
          ]
        },
        {
          id: '8',
          author: '에너지투자자',
          title: '청정에너지 포트폴리오',
          initialValue: 9000000,
          finalValue: 11700000,
          return: 30.0,
          sharpeRatio: 1.3,
          createdAt: '2024-01-28',
          trades: [
            {
              id: '8-1',
              date: '2024-01-28',
              type: 'buy',
              ticker: 'ENPH',
              shares: 200,
              price: 120.00,
              comment: '태양광 인버터 시장의 선두주자 Enphase'
            },
            {
              id: '8-2',
              date: '2024-02-01',
              type: 'buy',
              ticker: 'SEDG',
              shares: 150,
              price: 180.00,
              comment: 'SolarEdge의 혁신적인 태양광 기술'
            },
            {
              id: '8-3',
              date: '2024-02-05',
              type: 'buy',
              ticker: 'FSLR',
              shares: 100,
              price: 150.00,
              comment: 'First Solar의 박막 태양광 패널'
            },
            {
              id: '8-4',
              date: '2024-02-10',
              type: 'buy',
              ticker: 'PLUG',
              shares: 300,
              price: 25.00,
              comment: '수소 연료전지 기술의 Plug Power'
            },
            {
              id: '8-5',
              date: '2024-02-15',
              type: 'sell',
              ticker: 'SPWR',
              shares: 200,
              price: 8.00,
              comment: 'SunPower의 경영 악화로 인한 매도'
            },
            {
              id: '8-6',
              date: '2024-02-18',
              type: 'buy',
              ticker: 'RUN',
              shares: 250,
              price: 20.00,
              comment: '태양광 설치업체 Sunrun의 성장세'
            },
            {
              id: '8-7',
              date: '2024-02-20',
              type: 'buy',
              ticker: 'NEE',
              shares: 100,
              price: 80.00,
              comment: 'NextEra Energy의 재생에너지 포트폴리오'
            }
          ]
        },
        {
          id: '9',
          author: '게임투자자',
          title: '게임 산업 포트폴리오',
          initialValue: 4000000,
          finalValue: 5600000,
          return: 40.0,
          sharpeRatio: 1.4,
          createdAt: '2024-02-03',
          trades: [
            {
              id: '9-1',
              date: '2024-02-03',
              type: 'buy',
              ticker: 'ATVI',
              shares: 100,
              price: 85.00,
              comment: '블리자드의 인수로 인한 액티비전 블리자드'
            },
            {
              id: '9-2',
              date: '2024-02-05',
              type: 'buy',
              ticker: 'EA',
              shares: 150,
              price: 120.00,
              comment: 'EA의 스포츠 게임 시장 지배력'
            },
            {
              id: '9-3',
              date: '2024-02-08',
              type: 'buy',
              ticker: 'TTWO',
              shares: 100,
              price: 140.00,
              comment: 'Take-Two의 GTA 시리즈 성공'
            },
            {
              id: '9-4',
              date: '2024-02-10',
              type: 'buy',
              ticker: 'NTDOY',
              shares: 200,
              price: 12.00,
              comment: '닌텐도의 독창적인 게임 콘텐츠'
            },
            {
              id: '9-5',
              date: '2024-02-15',
              type: 'sell',
              ticker: 'ZNGA',
              shares: 300,
              price: 6.00,
              comment: 'Zynga의 모바일 게임 시장 경쟁력 약화'
            },
            {
              id: '9-6',
              date: '2024-02-18',
              type: 'buy',
              ticker: 'U',
              shares: 80,
              price: 35.00,
              comment: 'Unity의 게임 엔진 시장 지배력'
            },
            {
              id: '9-7',
              date: '2024-02-20',
              type: 'buy',
              ticker: 'RBLX',
              shares: 200,
              price: 45.00,
              comment: '메타버스 게임 플랫폼 로블록스'
            }
          ]
        },
        {
          id: '10',
          author: '물류투자자',
          title: '물류 및 운송 포트폴리오',
          initialValue: 11000000,
          finalValue: 13200000,
          return: 20.0,
          sharpeRatio: 0.9,
          createdAt: '2024-02-08',
          trades: [
            {
              id: '10-1',
              date: '2024-02-08',
              type: 'buy',
              ticker: 'AMZN',
              shares: 50,
              price: 150.00,
              comment: '이커머스와 물류의 대표주자 아마존'
            },
            {
              id: '10-2',
              date: '2024-02-10',
              type: 'buy',
              ticker: 'UPS',
              shares: 100,
              price: 180.00,
              comment: '글로벌 물류업계 1위 UPS'
            },
            {
              id: '10-3',
              date: '2024-02-12',
              type: 'buy',
              ticker: 'FDX',
              shares: 80,
              price: 220.00,
              comment: 'FedEx의 글로벌 물류 네트워크'
            },
            {
              id: '10-4',
              date: '2024-02-14',
              type: 'buy',
              ticker: 'DAL',
              shares: 200,
              price: 40.00,
              comment: '항공사 델타의 여행 수요 회복'
            },
            {
              id: '10-5',
              date: '2024-02-15',
              type: 'sell',
              ticker: 'UAL',
              shares: 150,
              price: 45.00,
              comment: '유나이티드 항공의 경영 불안정성'
            },
            {
              id: '10-6',
              date: '2024-02-18',
              type: 'buy',
              ticker: 'AAL',
              shares: 150,
              price: 15.00,
              comment: '아메리칸 항공의 저가 매수 기회'
            },
            {
              id: '10-7',
              date: '2024-02-20',
              type: 'buy',
              ticker: 'LUV',
              shares: 100,
              price: 35.00,
              comment: '사우스웨스트 항공의 안정적 경영'
            }
          ]
        }
      ]
      dispatch({ type: 'SET_PORTFOLIOS', payload: dummyPortfolios })
    }

    if (savedComments) {
      dispatch({ type: 'SET_COMMENTS', payload: JSON.parse(savedComments) })
    } else {
      // 더미 댓글 데이터 추가
      const dummyComments = {
        '1': [
          {
            id: 'c1-1',
            author: '투자초보자',
            content: 'AI 반도체 투자 전략이 정말 인상적이네요! 특히 NVIDIA와 AMD 조합이 좋은 것 같습니다.',
            createdAt: '2024-02-16',
            isAuthor: false
          },
          {
            id: 'c1-2',
            author: '테크마스터',
            content: '감사합니다! AI 시장의 성장세를 고려해서 선별적으로 투자했습니다. 앞으로도 좋은 성과 기대해주세요.',
            createdAt: '2024-02-16',
            isAuthor: true
          },
          {
            id: 'c1-3',
            author: '금융전문가',
            content: '포트폴리오 구성이 체계적이네요. 다만 리스크 분산을 위해 다른 섹터도 고려해보시는 건 어떨까요?',
            createdAt: '2024-02-17',
            isAuthor: false
          }
        ],
        '2': [
          {
            id: 'c2-1',
            author: '성장주팬',
            content: '성장주 중심 포트폴리오가 정말 멋져요! 특히 테슬라와 Palantir 조합이 인상적입니다.',
            createdAt: '2024-02-15',
            isAuthor: false
          },
          {
            id: 'c2-2',
            author: '벤처투자자',
            content: '감사합니다! 성장성이 높은 기업들을 중심으로 구성했습니다. 리스크는 있지만 장기적으로 좋은 수익을 기대합니다.',
            createdAt: '2024-02-15',
            isAuthor: true
          }
        ],
        '3': [
          {
            id: 'c3-1',
            author: '배당투자자',
            content: '안정적인 배당 포트폴리오네요. 존슨앤존슨과 P&G는 정말 좋은 선택입니다.',
            createdAt: '2024-02-20',
            isAuthor: true
          },
          {
            id: 'c3-2',
            author: '안정추구자',
            content: '배당 수익률이 어느 정도인지 궁금합니다. 연간 배당률 계산해보셨나요?',
            createdAt: '2024-02-21',
            isAuthor: false
          }
        ],
        '4': [
          {
            id: 'c4-1',
            author: '소셜트레이더',
            content: '소셜미디어 트렌드 포트폴리오입니다! 메타와 스냅챗 조합이 좋네요.',
            createdAt: '2024-02-18',
            isAuthor: true
          },
          {
            id: 'c4-2',
            author: '젊은투자자',
            content: '젊은층을 타겟으로 하는 소셜미디어 기업들이 정말 유망해 보이네요!',
            createdAt: '2024-02-19',
            isAuthor: false
          }
        ],
        '5': [
          {
            id: 'c5-1',
            author: '바이오투자자',
            content: '바이오테크 혁신 포트폴리오입니다. mRNA 기술의 미래가 밝아 보이네요.',
            createdAt: '2024-02-22',
            isAuthor: true
          },
          {
            id: 'c5-2',
            author: '의료전문가',
            content: '바이오테크는 리스크가 높지만 성장 가능성이 무한한 분야죠. 좋은 선택입니다.',
            createdAt: '2024-02-23',
            isAuthor: false
          }
        ]
      }
      dispatch({ type: 'SET_COMMENTS', payload: dummyComments })
    }
    if (savedLikes) {
      dispatch({ type: 'SET_LIKES', payload: JSON.parse(savedLikes) })
    } else {
      // 더미 추천 데이터 추가
      const dummyLikes = {
        '1': 42,
        '2': 38,
        '3': 25,
        '4': 31,
        '5': 29,
        '6': 18,
        '7': 22,
        '8': 35,
        '9': 27,
        '10': 20
      }
      dispatch({ type: 'SET_LIKES', payload: dummyLikes })
    }
    if (savedDislikes) {
      dispatch({ type: 'SET_DISLIKES', payload: JSON.parse(savedDislikes) })
    } else {
      // 더미 비추천 데이터 추가
      const dummyDislikes = {
        '1': 3,
        '2': 5,
        '3': 2,
        '4': 4,
        '5': 6,
        '6': 1,
        '7': 3,
        '8': 2,
        '9': 4,
        '10': 3
      }
      dispatch({ type: 'SET_DISLIKES', payload: dummyDislikes })
    }
  }, [])

  // 상태 변경 시 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('portfolios', JSON.stringify(state.portfolios))
  }, [state.portfolios])

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(state.comments))
  }, [state.comments])

  useEffect(() => {
    localStorage.setItem('likes', JSON.stringify(state.likes))
  }, [state.likes])

  useEffect(() => {
    localStorage.setItem('dislikes', JSON.stringify(state.dislikes))
  }, [state.dislikes])

  const addPortfolio = (portfolio) => {
    const newPortfolio = {
      ...portfolio,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    }
    dispatch({ type: 'ADD_PORTFOLIO', payload: newPortfolio })
  }

  const addComment = (portfolioId, comment) => {
    const newComment = {
      id: Date.now().toString(),
      author: '익명사용자',
      content: comment,
      createdAt: new Date().toISOString().split('T')[0],
      isAuthor: false
    }
    dispatch({ 
      type: 'ADD_COMMENT', 
      payload: { portfolioId, comment: newComment } 
    })
  }

  const updateLikes = (portfolioId) => {
    const currentLikes = state.likes[portfolioId] || 0
    dispatch({ 
      type: 'UPDATE_LIKES', 
      payload: { portfolioId, count: currentLikes + 1 } 
    })
  }

  const updateDislikes = (portfolioId) => {
    const currentDislikes = state.dislikes[portfolioId] || 0
    dispatch({ 
      type: 'UPDATE_DISLIKES', 
      payload: { portfolioId, count: currentDislikes + 1 } 
    })
  }

  const getPortfolioById = (id) => {
    return state.portfolios.find(portfolio => portfolio.id === id)
  }

  const getCommentsByPortfolioId = (portfolioId) => {
    return state.comments[portfolioId] || []
  }

  const getLikesByPortfolioId = (portfolioId) => {
    return state.likes[portfolioId] || 0
  }

  const getDislikesByPortfolioId = (portfolioId) => {
    return state.dislikes[portfolioId] || 0
  }

  return (
    <PortfolioContext.Provider value={{
      portfolios: state.portfolios,
      comments: state.comments,
      likes: state.likes,
      dislikes: state.dislikes,
      addPortfolio,
      addComment,
      updateLikes,
      updateDislikes,
      getPortfolioById,
      getCommentsByPortfolioId,
      getLikesByPortfolioId,
      getDislikesByPortfolioId
    }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export const usePortfolio = () => {
  const context = useContext(PortfolioContext)
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider')
  }
  return context
}
