import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readJson, updateJson } from '@nx/devkit';
import { addCommonQwikDependencies } from './add-common-qwik-dependencies';

describe('init generator', () => {
  let appTree: Tree;

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace({ layout: 'apps-libs' });
  });

  it('should add dependencies to package.json', async () => {
    await addCommonQwikDependencies(appTree);
    const { devDependencies } = readJson(appTree, 'package.json');
    expect(devDependencies['@builder.io/qwik']).toBeDefined();
    expect(devDependencies['@builder.io/qwik-city']).toBeDefined();
    expect(devDependencies['@types/node']).toBeDefined();
    expect(devDependencies['eslint-plugin-qwik']).toBeDefined();
    expect(devDependencies['node-fetch']).toBeDefined();
    expect(devDependencies['undici']).toBeDefined();
    expect(devDependencies['vite']).toBeDefined();
    expect(devDependencies['vitest']).toBeDefined();
    expect(devDependencies['vite-tsconfig-paths']).toBeDefined();
  });

  it('should not override existing versions', async () => {
    updateJson(appTree, 'package.json', (json) => {
      (json.devDependencies ??= {})['@builder.io/qwik'] = 'my-version';
      return json;
    });
    await addCommonQwikDependencies(appTree);
    const { devDependencies } = readJson(appTree, 'package.json');
    expect(devDependencies['@builder.io/qwik']).toBe('my-version');
  });

  it('should override existing versions if they are listed in "unsupportedPackageVersions" 1', async () => {
    updateJson(appTree, 'package.json', (json) => {
      (json.devDependencies ??= {})['vite'] = '5.1.1';
      return json;
    });
    await addCommonQwikDependencies(appTree);
    const { devDependencies } = readJson(appTree, 'package.json');
    expect(devDependencies['vite']).toBe('~5.2.0');
  });
  it('should not override existing versions if they are listed in "unsupportedPackageVersions" and have proper version', async () => {
    updateJson(appTree, 'package.json', (json) => {
      (json.devDependencies ??= {})['vite'] = '5.2.1';
      return json;
    });
    await addCommonQwikDependencies(appTree);
    const { devDependencies } = readJson(appTree, 'package.json');
    expect(devDependencies['vite']).toBe('5.2.1');
  });
});
