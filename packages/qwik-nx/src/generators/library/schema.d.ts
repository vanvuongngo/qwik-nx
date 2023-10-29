import { Linter } from '@nx/linter';

export interface LibraryGeneratorSchema {
  name: string;
  directory?: string;
  skipFormat?: boolean;
  style?: 'css' | 'scss' | 'styl' | 'less' | 'none';
  tags?: string;
  unitTestRunner?: 'vitest' | 'none';
  linter?: Linter;
  importPath?: string;
  strict?: boolean;
  buildable?: boolean;
  storybookConfiguration?: boolean;
  generateComponent?: boolean;
  projectNameAndRootFormat?: ProjectNameAndRootFormat;
}

type NormalizedRequiredPropsNames =
  | 'style'
  | 'unitTestRunner'
  | 'linter'
  | 'storybookConfiguration'
  | 'generateComponent'
  | 'projectNameAndRootFormat'
  | 'buildable';
type NormalizedRequiredProps = Required<
  Pick<LibraryGeneratorSchema, NormalizedRequiredPropsNames>
>;

export type NormalizedSchema = Omit<
  LibraryGeneratorSchema,
  NormalizedRequiredPropsNames
> &
  NormalizedRequiredProps & {
    projectName: string;
    projectRoot: string;
    parsedTags: string[];
    offsetFromRoot: string;
    setupVitest: boolean;
  };
