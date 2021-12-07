import QRCode from 'qrcode.react'

type QRCodeGeneratorProps = {
  data: string
  id?: string
}

export default function QRCodeGenerator({data, id="qrCodeEl"}: QRCodeGeneratorProps) {
  return (
    <div className="qr-code-box">
      <h4>{data}</h4>
      <QRCode
        value={JSON.stringify(data)}
        id={id}
        renderAs={'canvas'}
        size={290}
        level={'H'}
        includeMargin={true}
      />
    </div>
  )
}
