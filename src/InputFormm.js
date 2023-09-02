import { Button, TextInput,Box,Image, NumberInput } from '@mantine/core'
import React, { useState } from 'react'
import upiqr from "upiqr";
import council from './council.png'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [name, setName] = React.useState('');
  const [sch, setSch] = React.useState('');
  const [amt, setAmt] = React.useState('');
  const [show, setShow] = React.useState(false);
  const [data, setData] = React.useState({ qr: '', intent: '' });


  const UPIGen = ()=>{
    if(amt <= 50){
      toast.warn('Please enter amount above ₹50', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
    if(name.trim() && sch.trim() && amt > 50){
    upiqr({
        payeeVPA: "sharadyadavgolu@okhdfcbank",
        payeeName: "Sharad Yadav",
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
    className="box"
      style={{
        width: "100%",
padding: "5px 19px"

      }}
    >
<ToastContainer
position="bottom-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
  <img
      
      alt=''
      src={council}
     className="krsn"
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
      <br />

      <Button my="md"  style={{backgroundColor:"#f1b464",borderRadius:"0px",width:"100%"}}>
        Please try after sometime - Under Maintainence
      </Button>

      {show && (
        <Box className="qr">
          <Image  src={data.qr} />
          <Button onClick={() => {
            let str = `upi://pay?ver=01&mode=01&pa=rzpcbrbamzarcom@yesbank&pn=Bamzarcom&tr=RZPYMXVESXvGxfEkbHqrv2&cu=INR&mc=5399&qrMedium=04&tn=PaymenttoBamzarcom&am=`+amt;
            
            window.open(str, '_blank')}}  style={{backgroundColor:"#f1b464",borderRadius:"0px",width:"100%"}}>
            Open in App
          </Button>
          
        </Box>
      )}
    </Box>
  );
};

export default App;
