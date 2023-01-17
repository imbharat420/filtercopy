import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Copywright from "../components/Copywright"
import { RocketIcon } from "../components/Icons"
import {Container,Input,Label,FormWrapper, InputGroup,SubmitButton,LinkComponent,Para,Heading} from "./styled"
const Login = ()=>{
    const [formdata,setFormdata] = useState({
        login:"",
        password:"",
    })

    const InputHandler = (e)=>{
        setFormdata((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }

    const submitHandler = ()=>{
        
    }

    return(
        <Container>
            <FormWrapper>
                <Heading style={{textAlign:"center"}}>Register</Heading>
                <form>     
                    <InputGroup>
                        <Label class="label" for="login" >Email & Username</Label>
                        <Input name="login" id="login" type="text" onKeyUp={InputHandler} />
                    </InputGroup>
                   
                    <InputGroup>
                        <Label class="label" for="password" >Password</Label>
                        <Input name="password" id="password" type="password" onKeyUp={InputHandler}/>
                    </InputGroup>
                    <SubmitButton>
                     <RocketIcon/>
                    <span>Submit</span>
                    </SubmitButton>
                </form>
                <Para>Create an account ? <Link as={LinkComponent} to="/register">Register</Link></Para>
            </FormWrapper>
            
             <Copywright marginTop="20px" />
        </Container>
    )
}

export default Login