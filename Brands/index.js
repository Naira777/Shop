import React from 'react'
import {useWindowSize} from './../../CustomHooks/getWindowWidth';
import Brands_Desktop from './Brands_Desktop/index'
import Brands_Mobile from './Brands_Mobile/index'
import {useParams, useNavigate} from 'react-router-dom';


function Brands({}) {

    const [height, width] = useWindowSize();
    const navigate = useNavigate()
    const {filtertype} = useParams()

    if (filtertype == 'signuporsignin') {
        navigate('/brands/.../signuporsignin')

    }
    return (

        <div>

            {width > 500 ? <Brands_Desktop/> : <Brands_Mobile/>}

        </div>

    );
}

export default Brands;
