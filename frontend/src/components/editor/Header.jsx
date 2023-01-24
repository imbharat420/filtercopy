
import { BackIcon, PlusIcon } from "../Icons";
import {CenterWrapper, CollabContainer, HeaderContainer,AddMoreButton} from "../styled"
const Header = ()=>{
    return(
            <HeaderContainer>
                <CenterWrapper>
                   <BackIcon/>
                    Home
                </CenterWrapper>

                <CenterWrapper>
                 <CollabContainer>
            
                        <img src="https://avatars.dicebear.com/api/male/tech1.svg?mood[]=happy&mood[]=sad" alt="me"/>
                        <img src="https://avatars.dicebear.com/api/male/tech1.svg?mood[]=happy&mood[]=sad" alt="me"/>
                        <img src="https://avatars.dicebear.com/api/male/tech1.svg?mood[]=happy&mood[]=sad" alt="me"/>
                        <img src="https://profile.canva.com/users/UAFAsVtQQ5E/avatars/1/50.jpg" alt="me"/>
                        <AddMoreButton className="add-more">
                            <PlusIcon/>
                        </AddMoreButton>
                 </CollabContainer>
                </CenterWrapper>
            </HeaderContainer>
    )
}

export default Header;