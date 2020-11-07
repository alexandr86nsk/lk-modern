import { CustomObject } from '../@types';

function generateClassName<T extends CustomObject>(baseClass: string, props: T): string {
  let cls = baseClass;
  try {
    const keys = Object.keys(props);
    if (keys && Array.isArray(keys)) {
      keys.forEach((v) => {
        const el = props[v];
        if (el) {
          if (typeof el === 'string') {
            const typeArgs = el.split(' ');
            if (typeArgs && Array.isArray(typeArgs)) {
              typeArgs.forEach((w) => {
                cls = `${cls} ${baseClass}--${w}`;
              });
            }
          } else {
            cls = `${cls} ${baseClass}--${v}`;
          }
        }
      });
    }
  } catch (e) {
    console.log('[Fn: generateClassName] Error: ', e);
  }

  return cls;
}

export default generateClassName;
