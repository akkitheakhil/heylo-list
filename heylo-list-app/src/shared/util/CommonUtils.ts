export function isDataNotEmpty<T>(value: T): value is NonNullable<T> {
    if (value == null) {
        return false;
    } else if (typeof value !== 'number' && typeof value === 'string' && value?.trim() === '') {
        return false;
    } else if (value === undefined) {
        return false;
    } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
        return false;
    } else if (value !== null && Array.isArray(value) && !value.length) {
        return false;
    }

    return true;
}
