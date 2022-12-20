import React from "react";
import Profile_Desktop from "./Profile_Desktop";
import Profile_Mobile from "./Profile_Mobile";
import {useWindowSize} from "../../CustomHooks/getWindowWidth";


function Profile() {

    const [height, width] = useWindowSize();

    return (
        <div>
            {width > 750 ? <Profile_Desktop/> : <Profile_Mobile/>}
        </div>
    );
}
export default Profile;
