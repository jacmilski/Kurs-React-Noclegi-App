import { Component } from 'react';

const withMousePosition = (WrappedComponent) => {

    class Hoc extends Component {

        state = {
            x: 0,
            y: 0,
        }

        mousePositionHandler(e) {
            this.setState({x: e.pageX, y: e.pageY})
        }

        componentDidMount() {
            document.body.addEventListener('mousemove', this.mousePositionHandler.bind(this))
        }

        render() {
            return (
                <WrappedComponent 
                    {...this.props}
                    mouseX={this.state.x}
                    mouseY={this.state.y}
                />
            )
        }
    }

    return Hoc;
}

export default withMousePosition;