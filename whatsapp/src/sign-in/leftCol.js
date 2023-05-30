import pastoralPic from './pastoral_pic.jpg'

function LeftCol() {
    return (
        <div className="col left-col">
            <img src={pastoralPic} className="photo"></img>
        </div>
    )
}
export default LeftCol