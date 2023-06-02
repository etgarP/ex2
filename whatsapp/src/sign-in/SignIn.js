import './SignIn.css'
import LeftCol from './leftCol'
import RightCol from './right-col/rightCol'

function SignIn({ setUser, setContacts }) {
  return (
    <>
      <div className="row" id="container-sign">
        <LeftCol></LeftCol>
        <RightCol setUser={setUser} setContacts={setContacts}></RightCol>
      </div>
    </>
  )
}

export default SignIn

