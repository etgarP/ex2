import ContactImage from "../contactImage"
import DisplayName from "./displayName"
import AddContactIcon from "./addContactIcon"
import EscapeIcon from "./escapeIcon"

function TopLeft(props) {
    const { picture, displayName, setContacts, setUser } = props
    return (
        <div className="col-5 no-padding my-box-bottom">
            <div className="list-group no-rounded my-box-left">
                <div id="person-container">
                    <div className="row">
                        <div className="row">
                            {/* info about the user */}
                            <ContactImage picture={picture}></ContactImage>
                            <DisplayName displayName={displayName}></DisplayName>
                            {/* icons */}
                            <AddContactIcon setContacts={setContacts}></AddContactIcon>
                            <EscapeIcon setUser={setUser}></EscapeIcon>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TopLeft