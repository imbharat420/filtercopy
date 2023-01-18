import { useState,useContext } from "react"
import { Link, Navigate } from "react-router-dom"
import Copywright from "../components/Copywright"
import { RocketIcon } from "../components/Icons"

import { UserContext } from "../state/UserStore"
import { LoginAction } from "../action/AuthAction"

import {Container,Input,Label,FormWrapper, InputGroup,SubmitButton,LinkComponent,Para,Heading} from "./styled"
const Login = ()=>{
    const {state,dispatch} = useContext(UserContext)
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

    const submitHandler = (e)=>{
        e.preventDefault()
        LoginAction(formdata,dispatch)
    }
 
    return(
        <Container>
            <FormWrapper>
                <Heading style={{textAlign:"center"}}>Register</Heading>
                <form onSubmit={submitHandler}>     
                    <InputGroup>
                        <Label htmlFor="login" >Email & Username</Label>
                        <Input name="login" id="login" type="text" onInput={InputHandler} />
                    </InputGroup>
                   
                    <InputGroup>
                        <Label htmlFor="password" >Password</Label>
                        <Input name="password" id="password" type="password" onInput={InputHandler}/>
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