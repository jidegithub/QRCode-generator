import QRCode from 'qrcode.react'

type QRCodeGeneratorProps = {
  data: string
  id?: string
  size: number
}

export default function QRCodeGenerator({data, id="qrCodeEl", size}: QRCodeGeneratorProps) {
  return (
    <div className="qr-code-box">
      <h1>{data}</h1>
      <QRCode
        value={JSON.stringify(data)}
        id={id}
        renderAs={'canvas'}
        size={size}
        level={'H'}
        includeMargin={true}
      />
    </div>
  )
}
