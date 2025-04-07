export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p
            {...props}
            className={'text-sm text-metroAlert ' + className}
        >
            {message}
        </p>
    ) : null;
}
