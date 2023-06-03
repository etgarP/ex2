function Badge({ unReadNum, setNum, contactId, id }) {
    if (contactId === id) {
        setNum(0)
        console.log(contactId)
    }
    if (unReadNum > 0) {
        return <div className={`col-1`}>
            <span className="badge badge-pill badge-success notif">{unReadNum}</span>
        </div>
    } else {
        return null
    }
}

export default Badge