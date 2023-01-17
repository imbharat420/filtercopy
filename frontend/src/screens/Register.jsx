import { Link } from "react-router-dom"
import Copywright from "../components/Copywright"
import { RocketIcon } from "../components/Icons"
import {Container,Input,Label,FormWrapper, InputGroup,SubmitButton,LinkComponent,Para,Heading} from "./styled"

const Register = ()=>{
    return(
        <Container>
            <FormWrapper>
                <Heading style={{textAlign:"center"}}>Register</Heading>
                <form>
                    <InputGroup>
                        <Label class="label" for="name" >Name</Label>
                        <Input name="name" id="name" type="text" />
                    </InputGroup>

                    <InputGroup>
                        <Label class="label" for="username" >Username</Label>
                        <Input name="username" id="username" type="text" />
                    </InputGroup>

                    <InputGroup>
                        <Label class="label" for="email">Email address</Label>
                        <Input name="Email" id="email" type="email" />
                    </InputGroup>

                    <InputGroup>
                        <Label class="label" for="password" >Password</Label>
                        <Input name="password" id="password" type="password" />
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