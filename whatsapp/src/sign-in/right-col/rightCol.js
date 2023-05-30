import Form from './forms/form.js'
import Welcome from './welcome.js'
import ToRegister from './toRegister.js'

function RightCol({ setUser }) {
  return (
    <div className="col right-col">
      <div className="p-5">
        <Welcome></Welcome>
        <Form setUser={setUser}></Form>
        <ToRegister ></ToRegister>
      </div>
    </div>
  )
}

export default RightCol