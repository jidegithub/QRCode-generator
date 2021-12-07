import { useEffect, useRef, useState } from 'react'
import TextInput from './TextInput';
import QRCodeGenerator from './QRCodeGenerator';
import { useReactToPrint } from "react-to-print";

function App() {
  const componentRef = useRef(null)
  const buttonRef = useRef<null | HTMLButtonElement>(null)


  const [aisle, setAisle] = useState<string>('')
  const [rack, setRack] = useState<string>('')
  const [level, setLevel] = useState<string>('')
  const [printAllAddresses, setPrintAllAddresses] = useState<boolean>(false)
  const [encodedData, setEncodedData] = useState<string[]>([])
  const [showQRCode, setShowQRCode] = useState<boolean>(false)
  const [qrCodeSize, setQRCodeSize] = useState<number>(290)
  
  useEffect(() => {
    scrollToBottom()
  }, [showQRCode])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const { name, value } = event.target;
    let change:string
    switch (name) {
      case 'aisle':
        setAisle(value.toUpperCase())
        break;
      case 'rack':
        setRack(value)
        break;
      case 'level':
        setLevel(value)
        break;
      default:
        change= "unknown"
        return change;
    }
  }

  const toggleCheck = () => {
    setPrintAllAddresses(!printAllAddresses)
    setShowQRCode(false)
    setEncodedData([])
  }

  const submitHandler = (event: React.FormEvent) => { 
    event.preventDefault()
    generateQRCode()
    setShowQRCode(true)
    scrollToBottom()
    // setQRCodeSize(1270)
  }

  const generateQRCode = () => {
    if(!printAllAddresses){
      setEncodedData(generateSequence(20).flat())
      console.log(encodedData)
    }
    return setEncodedData([JSON.stringify(`${aisle + ':' + rack + ':' + level}`)])
  }

  const generateSequence = (quantity: number) => (
    Array.apply(0, Array(quantity)).map(function(_, idx) { return `${aisle}:${idx}` }).map((item, i, originarray) => {
      const temp = []
      const first =  item + ':i'
      temp.push(first) 
      const second = originarray[i] + ':ii'
      temp.push(second)
      return temp;
    })
  )

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    // onBeforePrint: () => setQRCodeSize(1290)
  });

  const scrollToBottom = () => {
    if(buttonRef.current){
      buttonRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      })
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Enter Pallet Address to Print
        </p>
      </header>
      <form onSubmit={submitHandler}>
        <div className="select-boxes">
          <TextInput value={aisle} name='aisle' placeholder="aisle" onChange={handleChange} />
          <TextInput value={rack} name='rack' type='number' placeholder="rack" onChange={handleChange} />
          <TextInput value={level} name='level' placeholder="level" onChange={handleChange} />
        </div>
        
        <div className="form-group">
          <input type="radio" defaultChecked onChange={toggleCheck} name="printAllAddresses" id="levelsonly"/>
          <label htmlFor="levelsonly">Print only this address</label>
        </div>
        
        <div className="form-group">
          <input type="radio" checked={printAllAddresses} onChange={toggleCheck} name="printAllAddresses" id="allrack"/>
          <label htmlFor="allrack">Print all addresses for this aisle</label>
        </div>
        
        {!showQRCode ? <input type='submit' value='submit' /> : null}
      </form>
      
      <div className="qr-code-container" ref={componentRef}>
        {showQRCode ? encodedData.map((data, idx) => <QRCodeGenerator key={idx} data={data} size={qrCodeSize}/>) : null}
      </div>
      {showQRCode ? <button ref={buttonRef} onClick={handlePrint}>print</button> : null}
    </div>
  );
}

export default App;
