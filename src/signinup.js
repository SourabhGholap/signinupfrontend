import {useState,useEffect} from 'react';
import email from './Assets/email.png';
import password from './Assets/password.png';
import person from './Assets/person.png';
import './signinup.css';

function Signinup() {
     
    let intituser;

     if(localStorage.getItem('users')==null){
         intituser = [];
     }
     else{
        intituser = JSON.parse(localStorage.getItem('users'));
     }
     const [users,setusers] = useState(intituser);
     const [action,setaction] = useState('Signup');
     const [username,setusername] = useState('');
     const [useremail,setuseremail] = useState('');
     const [userpassword,setuserpassword] = useState('');
     const [error,seterror] = useState('0');
     const [errortext,seterrortext] = useState('');
     const [forgotpassword,setforgotpassword] = useState('0');
     const [otp,setotp] = useState('');
     const [temp_otp,settemp_otp] = useState('');
     const [verified_otp,setverified_otp] = useState('0');
     const [otp_sent,setotp_sent] = useState('0');
     
     const update_user_password = (e) => {
        e.preventDefault();
        users.map((user)=>{
            if(user.email === useremail){
                user.password = userpassword;
                console.log('password updated');
                seterror('0');
                seterrortext('password updated');
                setforgotpassword('0');
            }
        })
     }

     const validate_otp = (e) => {  
        e.preventDefault();
        console.log('otp',otp);
        console.log('temp_otp',temp_otp);
        if(temp_otp == otp){
            console.log('otp verified');
            seterror('0');
            seterrortext('otp verified');
            setverified_otp('1');
        }
        else{
            console.log('incorrect otp');
            seterror('1');
            seterrortext('incorrect otp');
            setverified_otp('0');
        }
     }

    useEffect(()=>{
      }, [temp_otp]);

    useEffect(() => {
      }, [users]);

     const forgotpasswordaction = (e) => { 
        e.preventDefault();
        let flag = 0;
        users.map(async (user) => {
            if (user.email === useremail) {
                setotp_sent('1');
                flag = 1;
                const response = await fetch("http://localhost:8080/demo", {
                method: 'POST', 
                body : JSON.stringify({email: useremail}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const msg = await response.json();
            settemp_otp(msg.otp);
            }
        })
        if (flag === 0) {
            console.log('user not found');
            seterror('1');
            seterrortext('user not found Please signup first');
        }
    }

     const submit = (e) => {
        e.preventDefault();
        if(action==='Signup'){
            let flag = 0;
            users.map((user)=>{
                if(user.name === username || user.email === useremail){
                    console.log('username or email already exists');
                    seterror('1');
                    seterrortext('username or email already exists');
                    flag=1;
                }
            })
            if(flag===0 && username!=='' && useremail!=='' && userpassword!==''){
                const newuser= {
                name: username,
                email: useremail,
                password: userpassword
                }
                setusers([...users,newuser]);
                localStorage.setItem('users',JSON.stringify([...users,newuser]));
                console.log('signup success');
                seterror('0');
                seterrortext('signup success');
            }
            else if(flag===0){
                console.log('fill all the fields');
                seterror('1');
                seterrortext('fill all the fields');
            }
        }
        else{
            let flag = 0;
            users.map((user)=>{
                if(user.name===username && user.password===userpassword){
                    console.log('login success');
                    seterror('0');
                    seterrortext('login success');
                    flag=1;
                }
                else if (user.name===username && user.password!==userpassword) {
                    console.log('incorrect password');
                    seterror('1');
                    seterrortext('incorrect password');
                    flag=1;
                }
            })
            if(flag===0){
                console.log('user not found');
                seterror('1');
                seterrortext('user not found');
            }
        }
     }

     return (
        <div>
            <div>
                {forgotpassword === '0'?
                <div className='container'>
                <div className="submit-container">
                    <button className={action==="Login"?"submitgray":"submit"} onClick={()=> {setaction("Login"); seterror('0') ; seterrortext(' ')} }>Login</button>
                    <button className={action==="Signup"?"submitgray":"submit"} onClick={()=>{setaction("Signup") ;seterror('0') ; seterrortext(' ') }}>Signup</button>
                </div>
                <div className = 'header'>
                    <div className= 'text'>{action}</div>
                    <div className= 'underline'></div>
                </div>
                {error==='1'?<div className="error">{errortext}</div>:null}
                {error==='0'?<div className="success">{errortext}</div>:null}
                <form onSubmit={submit}>
                    <div className = 'inputs'>
                        <div className = 'input'>
                            <img src={person} alt="" />
                            <input type="text" value={username} onChange={(e)=>setusername(e.target.value)} id="username"/>
                        </div>
                        {action==='Signup'?<div className = 'input'> <div><img src={email} alt="" /> <input type = 'email' value={useremail} onChange={(e)=>setuseremail(e.target.value)} id="email"/> </div></div>: null} 
                        <div className = 'input'>
                            <img src={password} alt="" />
                            <input type="password" value={userpassword} onChange={(e)=>setuserpassword(e.target.value)} id="password"/>
                        </div>
                    </div>
                    {action==='Login'?<button className="forget-password" onClick = {()=>{setforgotpassword('1')}}>forgot password</button>:null}
                    <div className="submit-container">
                        <button className="submit" type="submit">{action}</button>
                    </div>
                </form>
               </div>
               :             
               <div className='container'>
               <div className = 'header'>
                   <div className= 'text'>{"Forgot password"}</div>
                   <div className= 'underline'></div>
               </div>
               <form onSubmit={forgotpasswordaction}>
                   <div className = 'inputs'>
                       {action==='Login'?<div className = 'input'> <div><img src={email} alt="" /> <input type = 'email' value={useremail} onChange={(e)=>setuseremail(e.target.value)} id="email"/> </div></div>: null} 
                   </div>
                   <div className="submit-container">
                        <button className="submit" type="submit">{'Send otp'}</button>
                   </div>
                   {error==='1'?<div className="error">{errortext}</div>:null}
                   {error==='0'?<div className="success">{errortext}</div>:null}
               </form>
                {otp_sent==='1'?            
               <form onSubmit={validate_otp}>
                   <div className = 'inputs'>
                       <div className = 'input'> <div><input type = 'text' value={otp} onChange={(e)=>setotp(e.target.value)} id="otp"/> </div></div>
                   </div>

                   <div className="submit-container">
                        <button className="submit" type="submit">{'verify'}</button>
                    </div>
               </form>:null
                }
               <div>
                {verified_otp==='1'?
                    <form onSubmit={update_user_password}>
                    <div className = 'inputs'>
                        <div className = 'input'> <div><img src={password} alt="" /> <input type = 'password' value={userpassword} onChange={(e)=>setuserpassword(e.target.value)} id="diff_password"/> </div></div>
                    </div>
                    <div className="submit-container">
                         <button className="submit" type="submit">{'update password'}</button>
                     </div>
                    </form>
                    : null
                }
                </div>
               </div>}
            </div>
        </div>
     )
}
export default Signinup;