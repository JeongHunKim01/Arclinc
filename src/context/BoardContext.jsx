import React, { createContext, useContext, useReducer, useEffect } from 'react'

const BoardContext = createContext()

const initialState = {
  posts: [],
  comments: {},
  likes: {},
  dislikes: {}
}

const boardReducer = (state, action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return { ...state, posts: action.payload }
    case 'ADD_POST':
      return { ...state, posts: [action.payload, ...state.posts] }
    case 'ADD_COMMENT':
      const postId = action.payload.postId
      const existingComments = state.comments[postId] || []
      return {
        ...state,
        comments: {
          ...state.comments,
          [postId]: [...existingComments, action.payload.comment]
        }
      }
    case 'UPDATE_LIKES':
      return {
        ...state,
        likes: {
          ...state.likes,
          [action.payload.postId]: action.payload.count
        }
      }
    case 'UPDATE_DISLIKES':
      return {
        ...state,
        dislikes: {
          ...state.dislikes,
          [action.payload.postId]: action.payload.count
        }
      }
    default:
      return state
  }
}

export const BoardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(boardReducer, initialState)

  // localStorage에서 데이터 로드
  useEffect(() => {
    // 강제로 더미 데이터 로드 (개발용)
    localStorage.clear()
    
    const savedPosts = localStorage.getItem('boardPosts')
    const savedComments = localStorage.getItem('boardComments')
    const savedLikes = localStorage.getItem('boardLikes')
    const savedDislikes = localStorage.getItem('boardDislikes')

    if (savedPosts) {
      dispatch({ type: 'SET_POSTS', payload: JSON.parse(savedPosts) })
    } else {
      // 더미 데이터로 초기화
      const dummyPosts = [
        {
          id: '1',
          author: '투자마스터',
          title: '2024년 하반기 투자 전략 공유',
          content: '안녕하세요! 2024년 하반기 투자 전략에 대해 이야기해보고 싶습니다. 현재 시장 상황을 보면 AI 관련 주식들이 여전히 강세를 보이고 있는데, 여러분은 어떤 종목에 투자하고 계신가요? 개인적으로는 반도체와 바이오 분야에 관심이 많습니다.',
          createdAt: '2024-02-15',
          viewCount: 245
        },
        {
          id: '2',
          author: '벤처투자자',
          title: '스타트업 투자 경험담',
          content: '최근 몇 년간 스타트업 투자를 해오면서 느낀 점들을 공유해드리려고 합니다. 성공한 투자도 있었고 실패한 투자도 있었는데, 가장 중요한 것은 팀의 실행력과 시장의 타이밍이라고 생각합니다. 특히 초기 단계에서는 아이디어보다는 팀이 더 중요하다고 봅니다.',
          createdAt: '2024-02-14',
          viewCount: 189
        },
        {
          id: '3',
          author: '테크마스터',
          title: 'AI 반도체 시장 전망',
          content: 'AI 반도체 시장이 급성장하고 있습니다. NVIDIA, AMD, TSMC 등 주요 기업들의 실적이 계속 좋아지고 있는데, 이는 AI 기술의 발전과 함께 지속될 것으로 예상됩니다. 특히 데이터센터용 반도체 수요가 크게 증가할 것으로 보입니다.',
          createdAt: '2024-02-13',
          viewCount: 312
        },
        {
          id: '4',
          author: '부동산투자자',
          title: '부동산 투자 시장 동향',
          content: '부동산 시장이 조금씩 회복되고 있는 것 같습니다. 특히 상업용 부동산과 임대용 부동산에 대한 관심이 높아지고 있는데, 여러분은 어떤 부동산에 투자하고 계신가요? 개인적으로는 오피스텔과 상가에 관심이 많습니다.',
          createdAt: '2024-02-12',
          viewCount: 156
        },
        {
          id: '5',
          author: '크립토마스터',
          title: '암호화폐 투자 전략',
          content: '암호화폐 시장이 다시 활기를 띠고 있습니다. 비트코인 반감기를 앞두고 있어서 시장이 긍정적으로 움직이고 있는데, 여러분은 어떤 코인에 투자하고 계신가요? 개인적으로는 비트코인과 이더리움을 중심으로 포트폴리오를 구성하고 있습니다.',
          createdAt: '2024-02-11',
          viewCount: 278
        }
      ]
      dispatch({ type: 'SET_POSTS', payload: dummyPosts })
    }

    if (savedComments) {
      dispatch({ type: 'SET_COMMENTS', payload: JSON.parse(savedComments) })
    } else {
      // 더미 댓글 데이터
      const dummyComments = {
        '1': [
          {
            id: '1-1',
            author: '투자초보',
            content: '정말 좋은 정보 감사합니다! 저도 AI 관련 주식에 관심이 많았는데 도움이 되었어요.',
            createdAt: '2024-02-15',
            isAuthor: false
          },
          {
            id: '1-2',
            author: '투자마스터',
            content: '도움이 되었다니 기쁩니다! 더 궁금한 점이 있으시면 언제든 말씀해주세요.',
            createdAt: '2024-02-15',
            isAuthor: true
          }
        ],
        '2': [
          {
            id: '2-1',
            author: '스타트업러버',
            content: '스타트업 투자 경험이 정말 인상적이네요. 팀의 실행력이 중요하다는 말씀에 동감합니다.',
            createdAt: '2024-02-14',
            isAuthor: false
          }
        ]
      }
      localStorage.setItem('boardComments', JSON.stringify(dummyComments))
    }

    if (savedLikes) {
      dispatch({ type: 'SET_LIKES', payload: JSON.parse(savedLikes) })
    } else {
      // 더미 추천 데이터
      const dummyLikes = {
        '1': 15,
        '2': 8,
        '3': 22,
        '4': 5,
        '5': 18
      }
      localStorage.setItem('boardLikes', JSON.stringify(dummyLikes))
    }

    if (savedDislikes) {
      dispatch({ type: 'SET_DISLIKES', payload: JSON.parse(savedDislikes) })
    } else {
      // 더미 비추천 데이터
      const dummyDislikes = {
        '1': 2,
        '2': 1,
        '3': 3,
        '4': 0,
        '5': 2
      }
      localStorage.setItem('boardDislikes', JSON.stringify(dummyDislikes))
    }
  }, [])

  // 상태 변경 시 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('boardPosts', JSON.stringify(state.posts))
  }, [state.posts])

  useEffect(() => {
    localStorage.setItem('boardComments', JSON.stringify(state.comments))
  }, [state.comments])

  useEffect(() => {
    localStorage.setItem('boardLikes', JSON.stringify(state.likes))
  }, [state.likes])

  useEffect(() => {
    localStorage.setItem('boardDislikes', JSON.stringify(state.dislikes))
  }, [state.dislikes])

  const addPost = (post) => {
    const newPost = {
      ...post,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      viewCount: 0
    }
    dispatch({ type: 'ADD_POST', payload: newPost })
  }

  const addComment = (postId, comment) => {
    const newComment = {
      id: Date.now().toString(),
      author: '익명사용자',
      content: comment,
      createdAt: new Date().toISOString().split('T')[0],
      isAuthor: false
    }
    dispatch({ 
      type: 'ADD_COMMENT', 
      payload: { postId, comment: newComment } 
    })
  }

  const updateLikes = (postId) => {
    const currentLikes = state.likes[postId] || 0
    dispatch({ 
      type: 'UPDATE_LIKES', 
      payload: { postId, count: currentLikes + 1 } 
    })
  }

  const updateDislikes = (postId) => {
    const currentDislikes = state.dislikes[postId] || 0
    dispatch({ 
      type: 'UPDATE_DISLIKES', 
      payload: { postId, count: currentDislikes + 1 } 
    })
  }

  const getPostById = (id) => {
    return state.posts.find(post => post.id === id)
  }

  const getCommentsByPostId = (postId) => {
    return state.comments[postId] || []
  }

  const getLikesByPostId = (postId) => {
    return state.likes[postId] || 0
  }

  const getDislikesByPostId = (postId) => {
    return state.dislikes[postId] || 0
  }

  return (
    <BoardContext.Provider value={{
      posts: state.posts,
      comments: state.comments,
      likes: state.likes,
      dislikes: state.dislikes,
      addPost,
      addComment,
      updateLikes,
      updateDislikes,
      getPostById,
      getCommentsByPostId,
      getLikesByPostId,
      getDislikesByPostId
    }}>
      {children}
    </BoardContext.Provider>
  )
}

export const useBoard = () => {
  const context = useContext(BoardContext)
  if (!context) {
    throw new Error('useBoard must be used within a BoardProvider')
  }
  return context
}
