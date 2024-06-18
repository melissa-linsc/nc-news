import { capitaliseStr } from "../capitaliseStr";

describe('capitaliseStr', () => {
    test('should return an empty string when passed an empty string', () => {
        expect(capitaliseStr('')).toBe('')
    });
    test('takes a single word string and capitalises the first letter', () => {
        expect(capitaliseStr('hello')).toBe('Hello')
    });
    test('takes multiple words and capitalise the first letter', () => {
        expect(capitaliseStr('hello world')).toBe('Hello world')
    });
});