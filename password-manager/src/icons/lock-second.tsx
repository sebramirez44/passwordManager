
export default function PasswordManagerIconSecond({size}: {size:number}) {
    return (
        <svg width={`${size}em`} height={`${size}em`} viewBox="0 42 50 50">
            <path d="M 10 65 C 10 40, 40 40, 40 65" fill="none" width="5" stroke="#2B2D42" strokeWidth="6"/>
            <rect x="5" y="60" width="40" height="30" fill="#2B2D42" rx="5" ry="5"/>
            <circle cx="25" cy="75" r="10" fill="#F00"/>
            <circle cx="25" cy="75" r="7" fill="#2B2D42"/>
        </svg>
    )
}