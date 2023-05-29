import './signUp.css'
import LeftCol from './leftCol'
import RightCol from './right-col/rightCol'

function SignUp({ users, setUsers }) {
  return (
    <div className="row" id="container-sign">
      {/* where the picture is at */}
      <LeftCol></LeftCol>
      {/* where the sign up form is */}
      <RightCol users={users} setUsers={setUsers}></RightCol>
    </div>
  )
}

export default SignUp