const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 5000

// 미들웨어
app.use(cors())
app.use(express.json())

// 정적 파일 서빙 (프로덕션용)
app.use(express.static(path.join(__dirname, '../dist')))

// API 라우트
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Proofolio API is running' })
})

// 모든 GET 요청을 React 앱으로 라우팅 (SPA 지원)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  console.log(`Health check: http://localhost:${PORT}/api/health`)
})

