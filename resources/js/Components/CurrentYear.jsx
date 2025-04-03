export default function CurrentYear() {
    let curr_year = new Date().getFullYear();
    return (
        <span>{curr_year}</span>
    );
}