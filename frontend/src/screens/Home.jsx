import { useState,useContext, useEffect } from "react";
import Upload from "../components/Upload";
import Image from "../components/Image";
import Sidebar from "../components/Sidebar";
import Zone from "../components/Zone";
import Subsidebar from "../components/Subsidebar";
import styled from "styled-components"

import bg from "../assets/bg.jpg"





import {StoreContext} from "../state/store"

import Input from "./Input"
import Markdown from "./Markdown";

const Home = ()=>{
    const { state, dispatch } = useContext(StoreContext)
    
    return(
       <Wrapper>
        {/* <button onClick={()=>console.log(state)}>Click</button> */}
            <Sidebar/>
            <Subsidebar/>
            <Zone/>
            <Content>
                <Upload/>
                <Image />
            </Content>       
       </Wrapper>
    )
}

export default Home


const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row
  width: 100%;
  height: 100vh;
  `

const Content = styled.div`
    padding: 10px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: url(${bg});
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 30px;
`


{/* <script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '{your-app-id}',
      cookie     : true,
      xfbml      : true,
      version    : '{api-version}'
    });
      
    FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script> */}