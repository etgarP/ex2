import ContactImage from "./contactImage"
import ContactName from "./contactName"

function TopRight(props) {
    const { contacts1, contactId } = props
    var contact = null;
    if (contacts1 != null) {
        contact = contacts1.find(contact => contact.id === contactId)
    }
    // the default background when no contact was chosen yet
    if (!contact) {
        return (
            <div className="col-7 no-padding whots-container"></div>
        )
    }
    return (
        <div className="col-7 no-padding">
            <div className="list-group no-rounded my-box" id="talking-to">
                <div id="person-container">
                    <div className="row">
                        {/* image of contact we talk to */}
                        <div className="col-2 limit-size">
                            <ContactImage picture={contact.user.profilePic}></ContactImage>
                        </div>
                        <div className="col center">
                        {/* name of contact we talk to */}
                            <ContactName contactName={contact.user.displayName}></ContactName>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TopRight