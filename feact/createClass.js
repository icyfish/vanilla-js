// https://www.mattgreer.org/articles/react-internals-part-one-basic-rendering/
const TopLevelWrapper = function(props) {
  this.props = props;
};

TopLevelWrapper.prototype.render = function() {
  return this.props;
};
// createClass 本身有 render 方法不会找到原型链, 返回普通dom元素的 props

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
    Constructor.prototype.render = spec.render;
    return Constructor;
  },

  render(element, container) {
    console.log(element, 'element')
    const wrapperElement = this.createElement(TopLevelWrapper, element);
    const componentInstance = new FeactCompositeComponentWrapper(
      wrapperElement
    );
    return componentInstance.mountComponent(container);
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
    console.log(Component)
    const componentInstance = new Component(this._currentElement.props);

    let element = componentInstance.render();

    while (typeof element.type === "function") {
      element = new element.type(element.props).render();
    }

    const domComponentInstance = new FeactDOMComponent(element);
    domComponentInstance.mountComponent(container);
  }
}

const MyTitle = Feact.createClass({
  render() {
    return Feact.createElement("h1", null, this.props.message);
  }
});

Feact.render(
  Feact.createElement(MyTitle, { message: "hey there Feact in class" }),
  // Feact.createElement("h1", null, 'hey there Feact in native DOM'),
  document.getElementById("root")
);
