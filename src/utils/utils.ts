/**
 * goTopPage
 * scrolls the page to the top smoothly
 */
export const goTopPage = (top: number = 0): void => {
    window.scrollTo({
        top: top,
        behavior: 'smooth'
    });
};

// function used for format required fields in forms
export const requiredField = (field: string): string => `${field} obbligatorio`;


// https://coreui.io/answers/how-to-shuffle-an-array-in-javascript/#:~:text=Use%20the%20Fisher%2DYates%20shuffle%20algorithm%20to%20randomly%20reorder%20array%20elements.&text=The%20Fisher%2DYates%20algorithm%20works,from%20the%20remaining%20unshuffled%20portion.
export const shuffleArray = <T>(array: T[]): T[] => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};
