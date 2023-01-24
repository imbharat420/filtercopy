import {useContext, useEffect} from "react";
import {useParams} from 'react-router-dom';



import Topbar from "../../components/editor/Topbar";
import BottomBar from "../../components/editor/BottomBar";

import Image from "../../components/editor/Image";
import Sidebar from "../../components/editor/Sidebar";
import Zone from "../../components/editor/Zone";
import Subsidebar from "../../components/editor/Subsidebar";
import Error from "../../components/Error";
import Header from "../../components/editor/Header";

import {StoreContext} from "../../state/store"
import {CanvasProvider} from "../../state/canvas"



import {getImgByIdAxios} from '../../action/ImageAction'


// !Styled Components
import {Wrapper,Content,EditorContainer} from "../styled"
 


const Design = ()=>{
    const { state:{error,image,loading},dispatch } = useContext(StoreContext)
    const {id} = useParams();


    useEffect(()=>{
      const func = async ()=>{
        await getImgByIdAxios(id,dispatch);
      }
      func();
    },[])
    
    return(
      <EditorContainer>
            <Header/>
              {error && <Error/>}
            
               <Wrapper>
              <Sidebar/>
              <Subsidebar/>
              <Zone/>
              <Content>
                  {image?.url && ( //63c6a5a4b9f7d52c951d947d/a360acdd-c410-4c56-a5d2-b5c326406799.png
                    <CanvasProvider> 
                      <Topbar/>
                      <Image currentImage={image} loading={loading} />  
                      <BottomBar/>
                    </CanvasProvider>
                  )} 
              </Content>
              </Wrapper>
         
       </EditorContainer>
    )
}

export default Design