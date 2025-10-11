import { type ReactNode } from 'react'

export default function Tablet({children} : {children : ReactNode}) {
    const width = window.innerWidth;
    return (
        width >= 768 && width < 1024 ? <>{children}</> : null
    );
}
