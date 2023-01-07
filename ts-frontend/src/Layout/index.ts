import styled,{css} from "styled-components";


const baseButton = css`
 color: white;
 background-color: black;
`

const fancyButton = css`
 ${baseButton};
 background-color: red;
`

const Button = styled.button`
  color: white;
  background-color: black;
`
const Fancy = styled(Button)`
  background-color: red;
`


export const Wrapper = styled.main`
    margin: 0;
    width: 100%;
    height: 100vh;
    background: #18191b; 
`

export const EditorWrapper = styled.main`
    width: 100%;
    height: 100%;
    background: #18191b; 
`

export const CanvasWrapper = styled.div`
    width: 100%;
    height: 100%;
`

export const SidebarWrapper = styled.div`
    width: 100%;
    height: 100%;
`