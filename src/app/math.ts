export interface ISize {
    width: number;
    height: number;
}

export interface IRect extends ISize {
    top: number;
    left: number;
}

export function fitInRect(rectToFit: ISize, inRect: IRect) {
    const targetAr = inRect.height ? inRect.width / inRect.height : Infinity;
    const sourceAr = rectToFit.height ? rectToFit.width / rectToFit.height : Infinity
    const fitHeight =
        targetAr > sourceAr ? inRect.height : inRect.width / sourceAr;
    const fitWidth = fitHeight * sourceAr;

    const fitScale = fitHeight / rectToFit.height;
    return {
        x: inRect.left + (inRect.width - fitWidth) / 2,
        y: inRect.top + (inRect.height - fitHeight) / 2,
        scale: fitScale,
    };
}

export function shrinkRect(rect: IRect, top: number, right: number, bottom: number, left: number): IRect {
    return {
        left: rect.left + left,
        top: rect.top + top,
        width: rect.width - left - right,
        height: rect.height - top - bottom,
    }
}

