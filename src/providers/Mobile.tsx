
import type { ReactNode } from 'react';

export default function Mobile({children} : {children : ReactNode}){
    const width = window.innerWidth;
    return (
        width < 768 ? <>{children}</> : null
    );
}