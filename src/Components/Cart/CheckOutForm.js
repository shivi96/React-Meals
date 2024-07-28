import { useState } from 'react';
import classes from './checkOutForm.module.css';

const CheckOutForm = (props) => {
  
    const [name,setName]=useState("");
    const [street,setStreet]=useState("");
    const [code,setCode]=useState("");
    const [city,setCity]=useState("");

   const[nameValid, setNameValid]=useState(true);
   const[streetValid, setStreetValid]=useState(true);
   const[codeValid, setCodeValid]=useState(true);
   const[cityValid, setCityValid]=useState(true);


    const nameHandler=(event)=>{
        setName(event.target.value);
        if(event.target.value.trim()!=='')
        {
            setNameValid(true);
        }
        else{
            setNameValid(false);

        }
    }
    const streetHandler=(event)=>{
        setStreet(event.target.value);
        if(event.target.value.trim()!=='')
        {
            setStreetValid(true);
        }
        else{
            setStreetValid(false);
        }
    }
    const codeHandler=(event)=>{
        setCode(event.target.value);
        if(event.target.value.length===6)
        {
            setCodeValid(true);
        }
        else{
            setCodeValid(false)
        }
        
    }
    const cityHandler=(event)=>{
        setCity(event.target.value);
        if(event.target.value.trim()!=='')
        {
            setCityValid(true);
        }
        else{
            setCityValid(false)
        }
    }

    const confirmHandler = (event) => {
    event.preventDefault();
    console.log(cityValid);
    console.log(codeValid);
    console.log(streetValid);
    console.log(nameValid);

    if(nameValid && streetValid && codeValid && cityValid)
    {
       props.onSubmit(
        {
            name:name,
            street:street,
            code:code,
            city:city
        }
       );    
    }
    else{
        console.log("invalid")
        return;
    }

    

  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' value={name} onChange={nameHandler}/>
        {!nameValid && <p>Name should not be empty</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' value={street} onChange={streetHandler} />
        {!streetValid && <p>Street should not be empty</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' value={code} onChange={codeHandler}/>
        {!codeValid && <p>Postal-Code should be 6 digit long</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' value={city} onChange={cityHandler}/>
        {!cityValid && <p>City should not be empty</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default CheckOutForm;