import './SignIn.css'
import LeftCol from './leftCol'
import RightCol from './right-col/rightCol'

function SignIn({ users, setUser }) {
  return (
    <>
      <div className="row" id="container-sign">
        <LeftCol></LeftCol>
        <RightCol users={users} setUser={setUser}></RightCol>
      </div>
    </>
  )
}

export default SignIn

