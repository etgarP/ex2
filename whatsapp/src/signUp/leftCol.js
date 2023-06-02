import pastoralPic from './pastoral_pic.jpg'

function LeftCol() {
    return (
        <div className="col-4 left-col">
            {/* the picture on the left */}
            <img src={pastoralPic} alt="pastoral background img" className="photo"></img>
        </div>
    )
}
export default LeftCol