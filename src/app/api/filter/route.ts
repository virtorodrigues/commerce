import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const condition = searchParams.get('condition') as string

  const redirectURL = new URL('/', request.url)
  redirectURL.searchParams.set('condition', condition)

  return NextResponse.redirect(redirectURL)
}
