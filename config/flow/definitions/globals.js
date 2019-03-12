// @flow

declare var JSON: {
  parse: string => any,
  stringify: any => string,
};

declare var window: {
  innerWidth: number,
  innerHeight: number,
  clientX: number,
  clientY: number,
  screenX: number,
  scrollY: number,
  pageXOffset: number,
  pageYOffset: number,

  scrollTo: (number, number) => void,

  body: HTMLBodyElement,

  location: Location,

  document: Document,

  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: () => void,
};
