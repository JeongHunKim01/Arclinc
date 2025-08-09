import React, { useEffect } from 'react'

const GoogleAd = ({ adSlot, adFormat = 'auto', style = {} }) => {
  useEffect(() => {
    // Google AdSense 스크립트 로드
    if (window.adsbygoogle) {
      window.adsbygoogle.push({})
    }
  }, [])

  return (
    <div className="ad-container" style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // 실제 AdSense 클라이언트 ID로 교체
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  )
}

export default GoogleAd


