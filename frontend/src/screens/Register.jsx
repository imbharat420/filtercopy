import {useContext,useState} from "react"
import { Link } from "react-router-dom"
import Copywright from "../components/Copywright"
import { RocketIcon } from "../components/Icons"
import {Container,Input,Label,FormWrapper, InputGroup,SubmitButton,LinkComponent,Para,Heading} from "./styled"

import { UserContext } from "../state/UserStore"
import { RegisterAction } from "../action/AuthAction"

const Register = ()=>{
   const {state,dispatch} = useContext(UserContext)
    const [formdata,setFormdata] = useState({
        name:"",
        username:"",
        email:"",
        password:"",
        avatar:""
    }) 

    const InputHandler = (e)=>{
        setFormdata((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }
    const submitHandler = (e)=>{
        e.preventDefault()
        RegisterAction(formdata,dispatch)
        console.log("submitHandler",state)
    }


    return(
        <Container>
            <FormWrapper>
                <Heading style={{textAlign:"center"}}>Register</Heading>
                <form onSubmit={submitHandler}>
                    <InputGroup>
                        <Label  htmlFor="name" >Name</Label>
                        <Input name="name" id="name" type="text" onInput={InputHandler} />
                    </InputGroup>

                    <InputGroup>
                        <Label  htmlFor="username" >Username</Label>
                        <Input name="username" id="username" type="text" onInput={InputHandler} />
                    </InputGroup>

                    <InputGroup>
                        <Label  htmlFor="email">Email address</Label>
                        <Input name="email" id="email" type="email" onInput={InputHandler} />
                    </InputGroup>

                    <InputGroup>
                        <Label  htmlFor="password" >Password</Label>
                        <Input name="password" id="password" type="password" onInput={InputHandler} />
                    </InputGroup>
                    <SubmitButton>
                        <RocketIcon/>
                        <span>Submit</span>
                    </SubmitButton>
                </form>
                <Para>Already have an account ? <Link as={LinkComponent} to="/login">Login</Link></Para>
            </FormWrapper>
            
             <Copywright marginTop="20px" />
        </Container>
    )
}
 
export default Register