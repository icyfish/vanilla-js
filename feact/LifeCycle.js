// https://www.mattgreer.org/articles/react-internals-part-two-componentWillMount-and-componentDidMount/
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
    const wrapperElement = this.createElement(TopLevelWrapper, element);

    const componentInstance = new FeactCompositeComponentWrapper(
      wrapperElement
    );
    return FeactReconciler.mountComponent(componentInstance, container);
  }
};

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

Feact.render(
  Feact.createElement(MyTitle, { message: "hey there Feact" }),
  document.getElementById("root")
);
