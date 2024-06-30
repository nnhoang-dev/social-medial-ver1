import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Checks if the given string is a base64 encoded image.
 *
 * @param {string} imageData - The string to be checked.
 * @return {boolean} Returns true if the string is a base64 encoded image, false otherwise.
 */
export function isBase64Image(imageData: string): boolean {
    // Regex to match base64 encoded image data.
    // The regex matches the following pattern:
    // "data:image/(png|jpe?g|gif|webp);base64,"
    const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/;

    // Use the regex to test if the given string matches the pattern.
    // If it does, return true, otherwise return false.
    return base64Regex.test(imageData);
}

/**
 * Formats a date string into a readable format.
 *
 * @param {string} dateString - The date string to be formatted.
 * @return {string} The formatted date string.
 */
export function formatDateString(dateString: string): string {
    // Define the options for formatting the date
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric', // Include the year
        month: 'short', // Include the month in short format (e.g., Jan)
        day: 'numeric', // Include the day of the month
    };

    // Create a Date object from the input string
    const date = new Date(dateString);

    // Format the date using the defined options
    const formattedDate = date.toLocaleDateString(undefined, options);

    // Format the time using the defined options
    const time = date.toLocaleTimeString([], {
        hour: 'numeric', // Include the hour
        minute: '2-digit', // Include the minute with 2 digits
    });

    // Return the formatted date and time string
    return `${time} - ${formattedDate}`;
}

/**
 * Formats the count of threads into a readable string.
 *
 * @param {number} count - The count of threads.
 * @return {string} The formatted string representing the count of threads.
 */
export function formatThreadCount(count: number): string {
    // If the count is zero, return the string 'No Threads'.
    if (count === 0) {
        return 'No Threads';
    } else {
        // Format the count into a string with a minimum length of 2.
        const threadCount = count.toString().padStart(2, '0');

        // Determine the word to use based on the count.
        const threadWord = count === 1 ? 'Thread' : 'Threads';

        // Return the formatted string with the count and word.
        return `${threadCount} ${threadWord}`;
    }
}
