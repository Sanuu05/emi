import { Box, Grid, Card, Slider, Input, Typography } from '@mui/material'
import { useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import logo from '../public/vite.svg'
ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [amount, setamount] = useState(1000)
  const [pa, setpa] = useState(1)
  const [process, setprocess] = useState(1)
  const [downp, setdownp] = useState(0)
  const [activem, setactivem] = useState(12)
  const months = [6,12,18, 24,30, 36,42, 48,56, 60]


const totalDownPayment=()=>{
  let downpx=Number(downp)
  const downPayment =downpx>0? (downpx + ((amount - downpx) * (process) / 100)):0
  return Number(downPayment)
}
  const EmiCalculate = () => {
    const P = amount - downp
    const R = pa / 100
    const N = activem / 12
    const Emi = (P * R * (1 + R) ** N) / ((1 + R) ** N - 1)
    return Number(Emi/12)
  }
  const color={
    back:'#A8CBEE',
    front:'#1976D2'

  }

  const data = {
    labels: ['Interest Amount', 'Principal Amount'],
    datasets: [
      {
        label: 'Amount',
        data: [Math.round(EmiCalculate()*activem),Math.round(EmiCalculate()*activem)-Math.round(amount-downp)],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="App">
      <Box sx={{ flexFlow: 1 ,padding:'15px'}}>
        <Grid container >
          <Grid xs={12} md={8}>
            <Box >
              
              <h3 style={{color:'orangered',fontSize:25}}><img src={logo} width={30} height={30} /> EMI CALCULATOR</h3>

              {/* Cost Of ASSET  */}

              <Box sx={{ padding: '20px 50px' }}>
                <Grid container >
                  <Grid xs={6} sx={{display:'flex',alignItems:'center'}} >
                    <Typography variant='h5' sx={{ fontSize:{xs:12,md:16}, fontWeight: 'bold' }} >Total Cost of Asset</Typography>
                  </Grid>
                  <Grid xs={6} style={{ display: 'flex',alignItems:'center', justifyContent: 'flex-end' }}>
                    <Box sx={{ display: 'flex',width:{xs:100,md:200}, padding: '5px 10px', borderRadius: '2px' ,backgroundColor:color.back}}>
                      <Typography variant='h5' sx={{color:color.front}} >₹</Typography>
                      <input placeholder='Amount' type='number' style={{ fontWeight: 'bold',border:'none',outline:'none',backgroundColor:'transparent',letterSpacing:'2px',paddingLeft:'5px',color:color.front }} value={amount} onChange={(e) => setamount(e.target.value)} />
                    </Box>

                  </Grid>
                  <Grid xs={12}>
                    <Slider

                     
                      value={amount}
                      valueLabelDisplay='auto'
                      min={10000}
                      max={amount+10000000}
                      onChange={(e) => setamount(e.target.value)}

                    />
                  </Grid>


                </Grid>

              </Box>

              {/* Interest Rate  */}

              <Box sx={{ padding: '20px 50px' }}>
                <Grid container >
                  <Grid xs={6}>
                    <Typography variant='h5' sx={{ fontSize:{xs:12,md:16}, fontWeight: 'bold' }}  >Interest Rate (in %)</Typography>
                  </Grid>
                  <Grid xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Box sx={{ display: 'flex',width:{xs:100,md:200}, padding: '5px 10px', borderRadius: '2px' ,backgroundColor:color.back}}>

                      <input placeholder='%' type='number' style={{ fontWeight: 'bold',border:'none',outline:'none',backgroundColor:'transparent',letterSpacing:'2px',paddingLeft:'5px',color:color.front }} value={pa} onChange={(e) => setpa(e.target.value)} />
                      <Typography variant='h5' sx={{color:color.front}}   >%</Typography>
                    </Box>

                  </Grid>
                  <Grid xs={12}>
                    <Slider

                      defaultValue={1}
                      value={pa}
                      step={0.1}
                      valueLabelDisplay='auto'
                      min={1}
                      max={30}
                      onChange={(e) => setpa(e.target.value)}

                    />
                  </Grid>


                </Grid>

              </Box>
              {/* Processing Fees  */}

              <Box sx={{ padding: '20px 50px' }}>
                <Grid container >
                  <Grid xs={12}>
                    <Typography variant='h5' sx={{ fontSize:{xs:12,md:16}, fontWeight: 'bold' }}   >Processing Fees (in %)</Typography>
                  </Grid>

                  <Grid xs={12}>
                    <Input placeholder='Amount' type='number' sx={{ fontWeight: 'bold', width: '100%' }} value={process} onChange={(e) => setprocess(e.target.value)} />
                  </Grid>


                </Grid>

              </Box>

              {/* Down Payment  */}

              <Box sx={{ padding: '20px 50px' }}>
                <Grid container >
                  <Grid xs={6}>
                    <Typography variant='h5' sx={{ fontSize:{xs:12,md:16}, fontWeight: 'bold' }}  >Down Payment</Typography>
                  </Grid>
                  <Grid xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Box sx={{ display: 'flex',width:{xs:100,md:200}, padding: '5px 10px', borderRadius: '2px' ,backgroundColor:color.back}}>
                      <Typography variant='h5' sx={{color:color.front}}  >₹</Typography>
                      <input placeholder='Amount' type='number'style={{ fontWeight: 'bold',border:'none',outline:'none',backgroundColor:'transparent',letterSpacing:'2px',paddingLeft:'5px',color:color.front }}  value={downp} onChange={(e) => setdownp(e.target.value)} />
                    </Box>

                  </Grid>
                  <Grid xs={12}>
                    <Slider
                      value={downp}
                      valueLabelDisplay='auto'
                      min={0}
                      max={amount}
                      onChange={(e) => setdownp(e.target.value)}

                    />
                  </Grid>


                </Grid>

              </Box>

              {/* Months  */}
              <Box sx={{ padding: '20px 50px' }}>
                <Typography variant='h5' sx={{ fontSize:{xs:12,md:16}, fontWeight: 'bold',marginBottom:2 }}  >Loan tenure (Months)</Typography>
                <Grid container >
                  {
                    months.map((v, i) => {
                      return <Grid sm={2} sx={{ padding: '0 5px',marginBottom:4 }} >
                        <p style={{ backgroundColor: activem == v ? color.front : color.back,cursor:'pointer' ,textAlign: 'center', padding: '5px', borderRadius: '10px', color: activem == v ? "white" : 'black' }} onClick={() => setactivem(v)}>{v}</p>
                      </Grid>
                    })
                  }
                </Grid>
              </Box>


            </Box>

          </Grid>
          <Grid xs={12} md={4}>
          <Grid xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '5px 0' }}>
             
             <p style={{padding:0}}>Amount</p>
             <p style={{padding:0}}>₹ {amount}</p>
           </Grid>
            <Grid xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '5px 0' }}>
             
              <p style={{padding:0}}>Total Down Payment</p>
              <p style={{padding:0}}>- ₹ {Math.round(totalDownPayment()) }</p>
            </Grid>
            <Grid xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '5px 0', }}>
              <p>Monthly EMI</p>
              <p>₹ {Math.round(EmiCalculate())}</p>
            </Grid>
            <Grid xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '5px 0' }}>
              <p>Principal Amount</p>
              <p>₹ {Math.floor(amount-downp)}</p>
            </Grid>
            <Grid xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '5px 0',borderBottom:'1px dotted grey' }}>
              <p>Total Interest</p>
              <p>₹ {Math.floor(EmiCalculate()*activem)-Math.floor(amount-downp)}</p>
            </Grid>
            <Grid xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '5px 0' }}>
              <p>Total </p>
              <p>₹ {Math.floor((EmiCalculate()*activem))}</p>
            </Grid>
            <Grid xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '5px 0' }}>
              <p>Total (With DownPayment) </p>
              <p>₹ {Math.floor((EmiCalculate()*activem)+totalDownPayment())}</p>
            </Grid>

            <Grid xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '5px 0' }}>
              <Pie data={data} />
            </Grid>



          </Grid>
        </Grid>

      </Box>
    </div>
  )
}

export default App
