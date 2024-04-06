import { Project, SyntaxKind, Node, JsxAttribute } from 'ts-morph';

const removedFeatureName = process.argv[2]; // example: isArticleRatingEnabled
const featureState = process.argv[3]; // example: off / on

const toggleComponentName = 'ToggleFeature';
const toggleFunctionName = 'toggleFeature';

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
      child.getText() === toggleFunctionName
    ) {
      isToggleFeature = true;
    }
  });

  return isToggleFeature;
}

function isToggleComponent(node: Node) {
  const identifier = node.getFirstDescendantByKind(SyntaxKind.Identifier);

  return identifier?.getText() === toggleComponentName;
}

const replaceFunction = (node: Node) => {
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
  const offFunction = offFunctionProp?.getFirstDescendantByKind(
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
};

const getAttributeNodeByName = (
  jsxAttributes: JsxAttribute[],
  name: string,
) => {
  return jsxAttributes.find((node) => node.getNameNode().getText() === name);
};

const getReplacedComponent = (attribute?: JsxAttribute) => {
  const value = attribute
    ?.getFirstDescendantByKind(SyntaxKind.JsxExpression)
    ?.getExpression()
    ?.getText();

  if (value?.startsWith('(')) {
    return value.slice(1, -1);
  }

  return value;
};

const replaceComponent = (node: Node) => {
  const attributes = node.getDescendantsOfKind(SyntaxKind.JsxAttribute);

  const onAttribute = getAttributeNodeByName(attributes, 'on');
  const offAttribute = getAttributeNodeByName(attributes, 'off');

  const featureNameAttribute = getAttributeNodeByName(attributes, 'name');
  const featureName = featureNameAttribute
    ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
    ?.getText()
    ?.slice(1, -1);

  if (featureName !== removedFeatureName) return;

  const offValue = getReplacedComponent(offAttribute);
  const onValue = getReplacedComponent(onAttribute);

  if (featureState === 'on' && onValue) {
    node.replaceWithText(onValue);
  }

  if (featureState === 'off' && offValue) {
    node.replaceWithText(offValue);
  }
};

files.forEach((file) => {
  file.forEachDescendant((node) => {
    if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
      replaceFunction(node);
    }

    if (
      node.isKind(SyntaxKind.JsxSelfClosingElement) &&
      isToggleComponent(node)
    ) {
      replaceComponent(node);
    }
  });
});

project.save();
