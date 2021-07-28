import React from 'react'

const DisplayBannerMsg = ({ msgInfo, setMsgInfo}) => {
  if (!msgInfo) return <></>

  setTimeout(() => setMsgInfo(), 3500)

  return (
    <div className={"baseClass " + msgInfo.className}>
      {msgInfo.message}
    </div>
  )
}

export default DisplayBannerMsg