function Date(props) {
    const { date } = props
    return (
        // prints the date
        <div className={`col align-right`}>
            <p className={`description`}>{date}</p>
        </div>
    )
}
export default Date