// @ts-nocheck
export function createImage(url:string):Promise<HTMLImageElement>{
  return new Promise((res,rej)=>{
    const img=new Image()
    img.crossOrigin='anonymous'
    img.onload=()=>res(img)
    img.onerror=(e)=>rej(e)
    img.src=url
  })
}
export const getRadianAngle=(deg)=>deg*Math.PI/180

export async function getCroppedBlob(src,area,rotation,bg,filter){
  const img=await createImage(src)
  const canvas=document.createElement('canvas')
  const ctx=canvas.getContext('2d')!
  canvas.width=area.width
  canvas.height=area.height
  ctx.fillStyle=bg
  ctx.fillRect(0,0,canvas.width,canvas.height)
  ctx.translate(canvas.width/2,canvas.height/2)
  ctx.rotate(getRadianAngle(rotation))
  ctx.translate(-canvas.width/2,-canvas.height/2)
  ctx.filter=filter
  ctx.drawImage(
    img,
    area.x,area.y,area.width,area.height,
    0,0,area.width,area.height
  )
  return new Promise(res=>canvas.toBlob(b=>res(b),'image/png'))
} 