import { useState, useEffect } from 'react'
import './Main.css'
import { Input } from "@material-ui/core"
import { Route } from 'react-router-dom'

const Main = ({ company }) => {
    const [cargoAmount, setCargoAmount] = useState(0)
    const [input, setInput] = useState('')

    useEffect(() => {
        if (company) {
            if (!company.boxes) company.boxes = '0'
            if (input) company.boxes = input
            const companyBoxesArr = company.boxes.split(',')
            let boxesSum = 0
            let calculatedCargo
            for (let i = 0; i < companyBoxesArr.length; i++) {
                let singleBoxAmount = parseFloat(companyBoxesArr[i])
                boxesSum += singleBoxAmount
                if (isNaN(boxesSum)) return
                if (boxesSum % 10 === 0) { 
                    calculatedCargo = parseInt(boxesSum / 10)
                } else calculatedCargo = parseInt(boxesSum/10) + 1
            }
            setCargoAmount(calculatedCargo)
        }
    }, [company, input])

    return (
        <div>
            {company ?
                <Route path={('/' + company.name)}>
                    <div className='main'>
                        <h1 className='main__h1'>{company.name}</h1>
                        <p className='main__email'>{company.email}</p>
                        <p className='main__cargoAmount'>Number of required cargo bays <b>{cargoAmount}</b></p>
                        <p>Cargo boxes</p>
                        <Input className='main__input' value={input} onInput={e => setInput(e.target.value)} placeholder={company.boxes} />
                    </div >
                </Route> : null}   
        </div>
    )
}

export default Main