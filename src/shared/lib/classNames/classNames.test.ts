import { classNames } from '@/shared/lib/classNames/classNames';

describe('classNames', () => {
  test('with only first argument', () => {
    expect(classNames('test')).toBe('test');
  });

  test('with additional classes', () => {
    const expected = 'test class1 class2';
    expect(classNames('test', {}, ['class1', 'class2'])).toBe(expected);
  });

  test('with mods and classes', () => {
    const expected = 'test class1 class2 hovered scrollable';
    expect(
      classNames('test', { hovered: true, scrollable: true }, [
        'class1',
        'class2',
      ])
    ).toBe(expected);
  });

  test('with falsy mod', () => {
    const expected = 'test class1 class2 hovered';
    expect(
      classNames('test', { hovered: true, scrollable: false }, [
        'class1',
        'class2',
      ])
    ).toBe(expected);
  });

  test('with undefined mod', () => {
    const expected = 'test class1 class2 hovered';
    expect(
      classNames('test', { hovered: true, scrollable: false }, [
        'class1',
        'class2',
      ])
    ).toBe(expected);
  });
});
