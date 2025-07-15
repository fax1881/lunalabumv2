import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { verifyTokenEdge } from '../../../lib/auth'

const prisma = new PrismaClient()
export const dynamic = 'force-dynamic'

// Templates list
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const where = category ? { category, isActive: true } : { isActive: true }
    const templates = await prisma.template.findMany({
      where,
      include: { elements: true }
    })
    return NextResponse.json(templates)
  } catch (err) {
    console.error('Template GET error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// Create template (admin only)
export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const payload = await verifyTokenEdge(token)
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    const { name, description, category, thumbnail, width, height, price, elements } = body

    if (!name || !category || !width || !height) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const template = await prisma.template.create({
      data: {
        name,
        description,
        category,
        thumbnail,
        width: Number(width),
        height: Number(height),
        price: price ? Number(price) : 0,
        elements: {
          create: (elements || []).map((el: any) => ({
            type: el.type,
            x: el.x,
            y: el.y,
            width: el.width,
            height: el.height,
            rotation: el.rotation || 0,
            zIndex: el.zIndex || 0,
            properties: JSON.stringify(el.properties || {})
          }))
        }
      },
      include: { elements: true }
    })

    return NextResponse.json(template, { status: 201 })
  } catch (err) {
    console.error('Template POST error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
} 