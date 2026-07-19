// 落款 (rakkan) seal mark: the brand stamp. Vermilion square, white 源.
// Used in the header, empty states, and share surfaces.
export function Seal({ size = 28 }: { size?: number }) {
    return (
        <span
            aria-hidden
            className="inline-grid place-items-center rounded-[22%] font-serif font-semibold select-none"
            style={{
                width: size,
                height: size,
                background: "#a33b26",
                color: "#f7f3e9",
                fontSize: size * 0.62,
                boxShadow: "inset 0 0 0 1px rgba(247,243,233,0.35)",
            }}
        >
            源
        </span>
    );
}
