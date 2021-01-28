# Real UI KIT

Real UI Storybook

## Документирование компонентов

Одним из обязательных требований при добавлении нового компонента в ui-kit является наличие документации: визуальное представление (story) и описание его API.

### Правила написания story

Для создания story компонента рекомендуется использовать Component story format (CSF). Подробная документация и возможности можно найти на официальной странице storybook: https://storybook.js.org/docs/react/writing-stories/introduction.

В зависимости от своей сложности, у каждого компонента может быть несколько story, однако обязательно должна быть basic story, иллюстрирующая базовое поведение компонента, например:

```typescript
const Basic = (args: ComponentProps) => {
  return (
    <MyComponent overlay="Текст" placement="top" {...args}>
      <Children />
    </MyComponent>
  );
};

Basic.args = {};
```

Столбец с элементами управления значениями props компонента генерируются автоматически на основе тайпскриптовых типов. Вместе с тем, некоторые элементы управления могут быть излишними, например `children`. Такие элементы необхомо исключать c помощью `disable: true`:

```typescript
Basic.argTypes = {
  children: {
    table: { type: { summary: 'ReactElement | string' } },
    control: { type: 'text', disable: true },
  },
};
```

### Описание API компонента

Описание props компонента необходимо добавлять в jsdoc формате непосредственно в сами тайпскриптовые типы. С помощью этой информации storybook сгенерирует таблицу с доступными props компонента, а также соответствующие инструменты для динамического управления этими значениями в рамках предпросмотра. Пример описания props:

```typescript
type ComponentProps = {
  /**
   * Оборачиваемый компонент / элемент
   */
  children: ReactElement | string;
  /**
   * Текст или элемент, отображаемый в тултипе
   */
  overlay: ReactElement | string;
  /**
   * Расположение тултипа
   */
  placement?: TooltipPlacement;
  /**
   * При включенной настройке и нехватке места для выбранного вида placement тултип будет автоматически выбирать свое местоположение
   */
  autoAdjustOverflow?: boolean;
  /**
   * Евент, на который будет реагировать тултип
   */
  trigger?: TooltipTriggerType;
  /**
   * Дополнительный className для обертки над children
   */
  wrapClassName?: string;
};
```
