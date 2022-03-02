export function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }

    return $tag;
}



