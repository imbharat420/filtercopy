import {useContext} from "react";
import Topbar from "../components/Topbar";
import BottomBar from "../components/BottomBar";

import Image from "../components/Image";
import Sidebar from "../components/Sidebar";
import Zone from "../components/Zone";
import Subsidebar from "../components/Subsidebar";
import Error from "../components/Error";

import styled from "styled-components"


// import bg from "../assets/bg.jpg"

import DragAndDropImage from "../components/DragAndDropImage";



import {StoreContext} from "../state/store"


const Home = ()=>{
    const { state } = useContext(StoreContext)
    console.log(state);
    return(
       <Wrapper>
            {state.error && <Error/>}
            <Sidebar/>
            <Subsidebar/>
            <Zone/>
            <Content>
                {state.image?.url !== undefined ? (
                  <> 
                    <Topbar/>
                    <Image />  
                    {/* <BottomBar/> */}
                  </>) : <DragAndDropImage />} 
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
    width: 100%;
    height: 100%;
    margin: 0 auto;
    background: #0d1216;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: auto;

`

// url(${bg});  


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