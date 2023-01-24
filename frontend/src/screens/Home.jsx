import {useContext} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../state/UserStore";



const Home = ()=>{  
  const {state} = useContext(UserContext) 
    const {user:{username}} = state;
    return(
      <div>
           {username}
           <ul>
            <li><Link to="/create">create</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li> <Link to="/register">Register</Link></li>
             {username && <li> <Link to={`/profile/${username}`}>Profile {username}</Link></li>}
           </ul>
       </div>
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