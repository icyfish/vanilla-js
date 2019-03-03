// https://www.mattgreer.org/articles/react-internals-part-three-basic-updating/
const TopLevelWrapper = function(props) {
  this.props = props;
};

TopLevelWrapper.prototype.render = function() {
  return this.props;
};

const Feact = {
  createElement(type, props, children) {
    const element = {
      type,
      props: props || {}
    };

    if (children) {
      element.props.children = children;
    }
    return element;
  },
  createClass(spec) {
    function Constructor(props) {
      this.props = props;
    }

    Constructor.prototype = Object.assign(Constructor.prototype, spec);

    return Constructor;
  },

  render(element, container) {
    const prevComponent = getTopLevelComponentInContainer(container);
    if (prevComponent) {
      return updateRootComponent(prevComponent, element);
    } else {
      return renderNewRootComponent(element, container);
    }
  }
};
function updateRootComponent(prevComponent, nextElement) {
  prevComponent.receiveComponent(nextElement);
}

function getTopLevelComponentInContainer(container) {
  return container.__feactComponentInstance;
}

function renderNewRootComponent(element, container) {
  const wrapperElement = Feact.createElement(TopLevelWrapper, element);

  const componentInstance = new FeactCompositeComponentWrapper(wrapperElement);

  const markUp = FeactReconciler.mountComponent(componentInstance, container);
  // 存储组件的实例, 我们只需要存储 _renderedComponent 即可, 因为 componentInstance 仅仅是 TopLevelWrapper
  container.__feactComponentInstance = componentInstance._renderedComponent;

  return markUp;
}

class FeactDOMComponent {
  constructor(element) {
    this._currentElement = element;
  }

  mountComponent(container) {
    const domElement = document.createElement(this._currentElement.type);
    const text = this._currentElement.props.children;
    const textNode = document.createTextNode(text);
    domElement.appendChild(textNode);

    container.appendChild(domElement);

    this._hostNode = domElement;
    return domElement;
  }
}

class FeactCompositeComponentWrapper {
  constructor(element) {
    this._currentElement = element;
  }

  mountComponent(container) {
    const Component = this._currentElement.type;
    const componentInstance = new Component(this._currentElement.props);
    this._instance = componentInstance;

    if (componentInstance.componentWillMount) {
      componentInstance.componentWillMount();
    }

    const markup = this.performInitialMount(container);

    if (componentInstance.componentDidMount) {
      componentInstance.componentDidMount();
    }
    return markup;
  }

  performInitialMount(container) {
    const renderElement = this._instance.render();
    const child = instantiateFeactComponent(renderElement);
    this._renderedComponent = child;

    return FeactReconciler.mountComponent(child, container);
  }
}

const FeactReconciler = {
  mountComponent(internalInstance, container) {
    return internalInstance.mountComponent(container);
  }
};

function instantiateFeactComponent(element) {
  if (typeof element.type === "string") {
    return new FeactDOMComponent(element);
  } else if (typeof element.type === "function") {
    return new FeactCompositeComponentWrapper(element);
  }
}
const MyTitle = Feact.createClass({
  componentWillMount() {
    console.log("componentWillMount");
  },
  componentDidMount() {
    console.log("componentDidMount");
  },
  render() {
    return Feact.createElement("h1", null, this.props.message);
  }
});

let root = document.getElementById("root");
Feact.render(Feact.createElement("h1", null, "hello"), root);

// setTimeout(function() {
//   Feact.render(Feact.createElement("h1", null, "hello again"), root);
// }, 2000);
