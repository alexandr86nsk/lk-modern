import { InferTypeFromArray } from '@src/types';

import { componentSizes } from '../size';

export type ComponentSizes = InferTypeFromArray<typeof componentSizes>;
