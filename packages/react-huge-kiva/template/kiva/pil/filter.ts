export function getImageData(can: HTMLCanvasElement, img: HTMLImageElement) {
    const ctx = can.getContext("2d");

    if (!ctx) {
        throw Error("No Context");
    }

    ctx.drawImage(img, 0, 0, can.width, can.height);

    const imageData = ctx.getImageData(0, 0, can.width, can.height);
    const imageDataLength = imageData.data.length / 4;

    return {ctx, imageData, imageDataLength};
}

/**
 * 图像反色，a = 255 - b
 * @param {HTMLCanvasElement} can
 * @param {string} src
 */
export function reverse(can: HTMLCanvasElement, src: string) {
    const img = new Image();
    img.src = src;
    img.onload = function() {
        const {ctx, imageData, imageDataLength} = getImageData(can, img);

        for (let i = 0; i < imageDataLength; i++) {
            imageData.data[i * 4] = 255 - imageData.data[i * 4];
            imageData.data[i * 4 + 1] = 255 - imageData.data[i * 4 + 1];
            imageData.data[i * 4 + 2] = 255 - imageData.data[i * 4 + 2];
        }

        ctx.putImageData(imageData, 0, 0);
    };
}

/**
 * 图片灰度处理，Gray = (Red * 0.3 + Green * 0.59 + Blue * 0.11)
 * @param {HTMLCanvasElement} can
 * @param {string} src
 */
function gray(can: HTMLCanvasElement, src: string) {
    const img = new Image();
    img.src = src;
    img.onload = function() {
        const {ctx, imageData, imageDataLength} = getImageData(can, img);

        for (let i = 0; i < imageDataLength; i++) {
            const red = imageData.data[i * 4];
            const green = imageData.data[i * 4 + 1];
            const blue = imageData.data[i * 4 + 2];
            const gray = 0.3 * red + 0.59 * green + 0.11 * blue;
            imageData.data[i * 4] = gray;
            imageData.data[i * 4 + 1] = gray;
            imageData.data[i * 4 + 2] = gray;
        }

        ctx.putImageData(imageData, 0, 0);
    };
}

/**
 * 单色效果
 * @param {HTMLCanvasElement} can
 * @param {string} src
 */
function onlyRed(can: HTMLCanvasElement, src: string) {
    const img = new Image();
    img.src = src;
    img.onload = function() {
        const {ctx, imageData, imageDataLength} = getImageData(can, img);

        for (let i = 0; i < imageDataLength; i++) {
            imageData.data[i * 4 + 1] = 0;
            imageData.data[i * 4 + 2] = 0;
        }

        ctx.putImageData(imageData, 0, 0);
    };
}

/**
 * 黑白版画
 * @param {HTMLCanvasElement} can
 * @param {string} src
 */
function engraving(can: HTMLCanvasElement, src: string) {
    const img = new Image();
    img.src = src;
    img.onload = function() {
        const {ctx, imageData, imageDataLength} = getImageData(can, img);

        for (let i = 0; i < imageDataLength; i++) {
            const red = imageData.data[i * 4];
            const green = imageData.data[i * 4 + 1];
            const blue = imageData.data[i * 4 + 2];
            const gray = 0.3 * red + 0.59 * green + 0.11 * blue;
            let newBlack;
            if (gray > 126) {
                newBlack = 255;
            } else {
                newBlack = 0;
            }
            imageData.data[i * 4] = newBlack;
            imageData.data[i * 4 + 1] = newBlack;
            imageData.data[i * 4 + 2] = newBlack;
        }

        ctx.putImageData(imageData, 0, 0);
    };
}

/**
 * 高斯模糊，算法原理：http://www.ruanyifeng.com/blog/2012/11/gaussian_blur.html
 * @param {HTMLCanvasElement} can
 * @param {string} src
 */
function gaussBlur(can: HTMLCanvasElement, src: string) {
    const img = new Image();
    img.src = src;
    img.onload = function() {
        const ctx = can.getContext("2d");

        if (!ctx) {
            throw Error("No Context");
        }

        ctx.drawImage(img, 0, 0, can.width, can.height);

        const imgData = ctx.getImageData(0, 0, can.width, can.height);

        const pixes = imgData.data;
        const width = imgData.width;
        const height = imgData.height;
        const gaussMatrix: number[] = [];
        let gaussSum = 0;
        let x;
        let y;
        let r;
        let g;
        let b;
        let a;
        let i;
        let j;
        let k;
        let len;

        const radius = 30;
        const sigma = 5;

        a = 1 / (Math.sqrt(2 * Math.PI) * sigma);
        b = -1 / (2 * sigma * sigma);

        // 生成高斯矩阵
        for (i = 0, x = -radius; x <= radius; x++, i++) {
            g = a * Math.exp(b * x * x);
            gaussMatrix[i] = g;
            gaussSum += g;
        }
        // 归一化, 保证高斯矩阵的值在[0,1]之间
        for (i = 0, len = gaussMatrix.length; i < len; i++) {
            gaussMatrix[i] /= gaussSum;
        }

        // x 方向一维高斯运算
        for (y = 0; y < height; y++) {
            for (x = 0; x < width; x++) {
                r = g = b = a = 0;
                gaussSum = 0;
                for (j = -radius; j <= radius; j++) {
                    k = x + j;
                    if (k >= 0 && k < width) {// 确保 k 没超出 x 的范围
                        // r,g,b,a 四个一组
                        i = (y * width + k) * 4;
                        r += pixes[i] * gaussMatrix[j + radius];
                        g += pixes[i + 1] * gaussMatrix[j + radius];
                        b += pixes[i + 2] * gaussMatrix[j + radius];
                        // a += pixes[i + 3] * gaussMatrix[j];
                        gaussSum += gaussMatrix[j + radius];
                    }
                }
                i = (y * width + x) * 4;
                // 除以 gaussSum 是为了消除处于边缘的像素, 高斯运算不足的问题
                pixes[i] = r / gaussSum;
                pixes[i + 1] = g / gaussSum;
                pixes[i + 2] = b / gaussSum;
                // pixes[i + 3] = a ;
            }
        }
        // y 方向一维高斯运算
        for (x = 0; x < width; x++) {
            for (y = 0; y < height; y++) {
                r = g = b = a = 0;
                gaussSum = 0;
                for (j = -radius; j <= radius; j++) {
                    k = y + j;
                    if (k >= 0 && k < height) {// 确保 k 没超出 y 的范围
                        i = (k * width + x) * 4;
                        r += pixes[i] * gaussMatrix[j + radius];
                        g += pixes[i + 1] * gaussMatrix[j + radius];
                        b += pixes[i + 2] * gaussMatrix[j + radius];
                        // a += pixes[i + 3] * gaussMatrix[j];
                        gaussSum += gaussMatrix[j + radius];
                    }
                }
                i = (y * width + x) * 4;
                pixes[i] = r / gaussSum;
                pixes[i + 1] = g / gaussSum;
                pixes[i + 2] = b / gaussSum;
            }
        }

        ctx.putImageData(imgData, 0, 0);
    };
}

/**
 * 浮雕效果，Color = Xa - xb + C (C常量，Xa后一个像素的RGB，Xb前一个像素的RGB)
 * @param {HTMLCanvasElement} can
 * @param {string} src
 */
function relief(can: HTMLCanvasElement, src: string) {
    const img = new Image();
    img.src = src;
    img.onload = function() {
        const ctx = can.getContext("2d");

        if (!ctx) {
            throw Error("No Context");
        }

        ctx.drawImage(img, 0, 0, can.width, can.height);

        const canvasData = ctx.getImageData(0, 0, can.width, can.height);

        const tempCanvasData = new ImageData(new Uint8ClampedArray(canvasData.data), canvasData.width, canvasData.height);
        for (let x = 0; x < tempCanvasData.width - 1; x++) {
            for (let y = 0; y < tempCanvasData.height - 1; y++) {
                // Index of the pixel in the array
                const idx = (x + y * tempCanvasData.width) * 4;
                const bidx = ((x - 1) + y * tempCanvasData.width) * 4;
                const aidx = ((x + 1) + y * tempCanvasData.width) * 4;

                // calculate new RGB value
                let nr = tempCanvasData.data[aidx] - tempCanvasData.data[bidx] + 128;
                let ng = tempCanvasData.data[aidx + 1] - tempCanvasData.data[bidx + 1] + 128;
                let nb = tempCanvasData.data[aidx + 2] - tempCanvasData.data[bidx + 2] + 128;
                nr = (nr < 0) ? 0 : ((nr > 255) ? 255 : nr);
                ng = (ng < 0) ? 0 : ((ng > 255) ? 255 : ng);
                nb = (nb < 0) ? 0 : ((nb > 255) ? 255 : nb);

                // assign new pixel value
                canvasData.data[idx] = nr; // Red channel
                canvasData.data[idx + 1] = ng; // Green channel
                canvasData.data[idx + 2] = nb; // Blue channel
                canvasData.data[idx + 3] = 255; // Alpha channel
            }
        }
        ctx.putImageData(canvasData, 0, 0);
    };
}
