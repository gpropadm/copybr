import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const userId = searchParams.get('state') // User ID passado como state
    
    if (!code || !userId) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard/redes-sociais?error=auth_failed`)
    }

    // Exchange code for access token
    const tokenResponse = await fetch('https://graph.facebook.com/v18.0/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.FACEBOOK_APP_ID!,
        client_secret: process.env.FACEBOOK_APP_SECRET!,
        redirect_uri: 'https://copybr.vercel.app/api/auth/facebook/callback',
        code,
      }),
    })

    const tokenData = await tokenResponse.json()
    
    if (!tokenData.access_token) {
      throw new Error('Failed to get access token')
    }

    // Get user info from Facebook
    const userResponse = await fetch(`https://graph.facebook.com/me?fields=id,name&access_token=${tokenData.access_token}`)
    const userData = await userResponse.json()

    // Get pages (optional - for posting to pages)
    const pagesResponse = await fetch(`https://graph.facebook.com/me/accounts?access_token=${tokenData.access_token}`)
    const pagesData = await pagesResponse.json()

    // Save to database
    await prisma.socialAccount.upsert({
      where: {
        userId_platform: {
          userId: userId,
          platform: 'FACEBOOK'
        }
      },
      update: {
        username: userData.name || userData.id,
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token || null,
        expiresAt: tokenData.expires_in 
          ? new Date(Date.now() + tokenData.expires_in * 1000) 
          : new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days default
        isActive: true,
        updatedAt: new Date()
      },
      create: {
        userId: userId,
        platform: 'FACEBOOK',
        username: userData.name || userData.id,
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token || null,
        expiresAt: tokenData.expires_in 
          ? new Date(Date.now() + tokenData.expires_in * 1000) 
          : new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        isActive: true
      }
    })

    // Redirect back to dashboard with success
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard/redes-sociais?success=facebook_connected`)

  } catch (error) {
    console.error('Facebook OAuth error:', error)
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/dashboard/redes-sociais?error=connection_failed`)
  }
}