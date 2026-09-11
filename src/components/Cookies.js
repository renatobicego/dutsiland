'use client'

import { useEffect, useState } from 'react'
import { site } from '@/content/site'

const KEY = 'dutsiland:cookies-accepted'

export default function Cookies() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true)
    } catch (e) {
      setVisible(true)
    }
  }, [])

  const accept = () => {
    try {
      localStorage.setItem(KEY, '1')
    } catch (e) {}
    setVisible(false)
  }

  return (
    <div className={`container-cookies ${visible ? '' : 'd-none'}`} data-aos="reveal-up .8s ease-out-cubic 1s" data-cursor-style="default">
      <div className="utilizamos-cookies">
        <p className="font-1 fs--13 text-cookies lh-150">
          {site.cookies.text}{' '}
          <a className="btn-underline black-1" href={site.footer.legal[1].href} data-cursor-style="hovered-small">
            <span>{site.cookies.linkLabel}</span>
          </a>{' '}
          y el uso de cookies.
        </p>
        <div className="container-btn">
          <button type="button" className="btn-cookies accept font-1 fs--12 black-1 btn-underline text-uppercase" onClick={accept} data-cursor-style="hovered-small">
            <span>{site.cookies.accept}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
