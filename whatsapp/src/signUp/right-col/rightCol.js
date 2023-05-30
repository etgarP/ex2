import Form from './forms/form.js'
import Welcome from './welcome.js'
import ToSign from './toSign.js'

function RightCol({ users, setUsers }) {
  return (
    <div className="col right-col">
      <div className="p-5">
        {/* the register area */}
        <Welcome></Welcome>
        <Form ></Form>
        <ToSign></ToSign>
      </div>
    </div>
  )
}

export default RightCol
