export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-gray-300 text-[#334155]  shadow-sm focus:ring-[#334155]  ' +
                className
            }
        />
    );
}
