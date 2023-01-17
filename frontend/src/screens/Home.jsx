import {useContext} from "react";


import Topbar from "../components/editor/Topbar";
import BottomBar from "../components/editor/BottomBar";

import Image from "../components/editor/Image";
import Sidebar from "../components/editor/Sidebar";
import Zone from "../components/editor/Zone";
import Subsidebar from "../components/editor/Subsidebar";
import Error from "../components/Error";




// import bg from "../assets/bg.jpg"

import DragAndDropImage from "../components/editor/DragAndDropImage";


import useTitle from "../hooks/useTitle"
import {StoreContext} from "../state/store"
import {CanvasProvider} from "../state/canvas"


// Styled Components
import {Wrapper,Content} from "./styled"



const Home = ()=>{
    const { state } = useContext(StoreContext)
    console.log(state);
    useTitle("FilterCopy","😭 Come Back")
    return(
       <Wrapper>
            {state.error && <Error/>}
            <Sidebar/>
            <Subsidebar/>
            <Zone/>
            <Content>
                {state.image?.url !== undefined ? (
                  <CanvasProvider> 
                    <Topbar/>
                    <Image />  
                    <BottomBar/>
                  </CanvasProvider>) : <DragAndDropImage />} 
            </Content>
       </Wrapper>
    )
}

export default Home


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