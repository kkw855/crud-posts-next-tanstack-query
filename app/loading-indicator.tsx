'use client'

import BeatLoader from 'react-spinners/BeatLoader'

export default function LoadingIndicator() {
  return (
    <div className="w-full text-center">
      <BeatLoader size={18} margin={4} speedMultiplier={2} />
    </div>
  )
}
