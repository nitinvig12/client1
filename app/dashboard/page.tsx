'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardRedirect() {
  const router = useRouter()
  useEffect(() => {
    const role = sessionStorage.getItem('userRole')
    router.replace(role === 'practitioner' ? '/dashboard/practitioner' : '/dashboard/seeker')
  }, [router])
  return null
}
