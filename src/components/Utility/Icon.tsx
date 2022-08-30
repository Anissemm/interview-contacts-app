const Icon: React.FC<{ name: string, size?: number, color?: string, gap?: number }> = ({ name, size = 24 , color = 'inherit', gap = 0 }) => {
    return (
        <span
            style={{ fontSize: size, color, margin: `0 ${gap}px`, position: 'relative', top: 2 }}
            aria-hidden='true'
            className="material-symbols-outlined">
            {name}
        </span>
    )
}

export default Icon