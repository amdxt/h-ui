import Button from '../index';
import { describe, test, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';

function add(a: number, b: number) {
    return a + b
}

describe('add function', () => {
    test('add(1, 3) should 3', () => {
        expect(add(1,2)).toBe(3)
    });

    test('add(0, 0) should 0', () => {
        const ret = add(0, 0)
        expect(ret).toBe(0)
    });
});

describe('Button', () => {
    test('mount Button', () => {
        const wrapper = shallowMount(Button, {
            slots: {
                default: 'btn'
            },
            props: {
                color: 'red',
            }
        })

        const text = wrapper.text()
        const classList = wrapper.classes()
        expect(classList.includes("bg-red-500")).toBeTruthy()
    });
});

