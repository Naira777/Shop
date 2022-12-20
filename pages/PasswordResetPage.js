import MainLayout from '../layouts/MainLayout'
import PasswordReset from './../components/PasswordReset/index';
import Popup from './../components/Popup/index';



function PasswordResetPage() {
  return (

    <MainLayout>
   <Popup mod1={true}> <PasswordReset /> </Popup>
    </MainLayout>

   
  );
}
export default PasswordResetPage;