import { Project, SyntaxKind, Node } from 'ts-morph';

const removedFeatureName = process.argv[2]; // example: isArticleRatingEnabled
const featureState = process.argv[3]; // example: off / on

if (!removedFeatureName) {
  throw new Error('Specify feature name');
}

if (!featureState) {
  throw new Error('Specify feature state');
}

if (featureState !== 'on' && featureState !== 'off') {
  throw new Error('Specified feature state should be "on" or "off"');
}

const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

function isToggleFunction(node: Node) {
  let isToggleFeature = false;

  node.forEachChild((child) => {
    if (
      child.isKind(SyntaxKind.Identifier) &&
      child.getText() === 'toggleFeature'
    ) {
      isToggleFeature = true;
    }
  });

  return isToggleFeature;
}

files.forEach((file) => {
  file.forEachDescendant((node) => {
    if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
      const objOptions = node.getFirstDescendantByKind(
        SyntaxKind.ObjectLiteralExpression,
      );

      if (!objOptions) return;

      const nameFunctionProp = objOptions.getProperty('name');
      const onFunctionProp = objOptions.getProperty('on');
      const offFunctionProp = objOptions.getProperty('off');

      const onFunction = onFunctionProp?.getFirstDescendantByKind(
        SyntaxKind.ArrowFunction,
      );
      const offFunction = onFunctionProp?.getFirstDescendantByKind(
        SyntaxKind.ArrowFunction,
      );
      const featureName = nameFunctionProp
        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
        ?.getText()
        .slice(1, -1);

      if (featureName !== removedFeatureName) return;

      if (featureState === 'on') {
        node.replaceWithText(onFunction?.getBody().getText() ?? '');
      }

      if (featureState === 'off') {
        node.replaceWithText(offFunction?.getBody().getText() ?? '');
      }
    }
  });
});

project.save();
