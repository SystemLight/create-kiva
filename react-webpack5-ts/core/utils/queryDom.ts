/*
    获取元素相对文档根元素Left绝对位置
 */
function getElementLeft(element: HTMLElement): number {
    let actualLeft = element.offsetLeft;
    let current = element.offsetParent as HTMLElement;

    while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent as HTMLElement;
    }

    return actualLeft;
}

/*
    获取元素相对文档窗口Left相对位置
 */
function getElementViewLeft(element: HTMLElement): number {
    const actualLeft = getElementLeft(element);

    const elementScrollLeft = document.compatMode == "BackCompat" ?
        document.body.scrollLeft :
        document.documentElement.scrollLeft;

    return actualLeft - elementScrollLeft;
}

/*
    获取元素相对文档根元素Top绝对位置
 */
function getElementTop(element: HTMLElement): number {
    let actualTop = element.offsetTop;
    let current = element.offsetParent as HTMLElement;

    while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent as HTMLElement;
    }

    return actualTop;
}

/*
    获取元素相对文档窗口Top相对位置
 */
function getElementViewTop(element: HTMLElement): number {
    const actualTop = getElementTop(element);

    const elementScrollTop = document.compatMode == "BackCompat" ?
        document.body.scrollTop :
        document.documentElement.scrollTop;

    return actualTop - elementScrollTop;
}
