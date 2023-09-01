import { Button, TextInput,Box,Image, NumberInput } from '@mantine/core'
import React, { useState } from 'react'
import upiqr from "upiqr";
import council from './council.png'


const App = () => {
  const [name, setName] = React.useState('');
  const [sch, setSch] = React.useState('');
  const [amt, setAmt] = React.useState('');
  const [show, setShow] = React.useState(false);
  const [data, setData] = React.useState({ qr: '', intent: '' });


  const UPIGen = ()=>{
        
    if(name.trim() && sch.trim() && amt > 50){
    upiqr({
        payeeVPA: "9111827985@paytm",
        payeeName: "MANIT Janmashtami",
        amount : amt
      })
      .then((upi) => {
        console.log(upi)
        setData({
            'qr' : upi.qr,
            'intent' : upi.intent
        })
        setShow(true)

        fetch('https://payment-api-coral.vercel.app/addsch', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'name' : name,
                'amount' : amt,
                'sch' : String(sch)
            }),
          })


        

        
      })
      .catch(err => {
        console.log(err);
      });
    }
}

  return (
    <Box
    class="box"
      style={{
        width: "100%",
padding: "5px 19px"

      }}
    >

  <img
      
      alt=''
      src={council}
     class="krsn"
      style={{width: "150px",
        height: "150px",
        marginLeft: "auto",
        marginRight: "auto",
        display: "block",
        padding: "35px 0px",
       }}
    />

      
      <TextInput
        placeholder="Your name"
        label="Your name"
        variant="filled"
        withAsterisk
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />

      <TextInput
        placeholder="Your Scholar Number"
        label="Scholar No"
        variant="filled"
        withAsterisk
        value={sch}
        onChange={(e) => setSch(e.currentTarget.value)}
      />

      <NumberInput
        placeholder="Your Donation Amount"
        label="Donation Amount"
        variant="filled"
        withAsterisk
        value={amt}
        onChange={setAmt}
      />

      <Button my="md" onClick={() => UPIGen()} style={{backgroundColor:"#f1b464",borderRadius:"0px",width:"100%"}}>
        Donate
      </Button>

      {show && (
        <Box class="qr">
          <Image  src={data.qr} />
          <Button onClick={() => window.open(data.intent, '_blank')}  style={{backgroundColor:"#f1b464",borderRadius:"0px",width:"100%"}}>
            Open in App
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default App;
