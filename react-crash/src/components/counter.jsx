import React, {Component} from "react";

class Counter extends Component {
    state = {
        count: 0,
        imageUrl: 'https://picsum.photos/400',
        tags: ['tag1', 'tag2', 'tag3']
    }



    handleIncrement = (product) => {
        this.setState({count: this.state.count + 1})
    }


    render() {
        return <div>
            <span className={this.extracted()}>{this.formatCount()}</span>
            <button onClick={()=>this.handleIncrement({id:1})} className="btn btn-secondary btn-sm">Increment</button>
        </div>
    }

    extracted() {
        let classes = "badge m-2 ";
        classes += (this.staate.count === 0) ? "badge-warning" : "badge-primary";
        return classes
    }

    formatCount() {
        return this.staate.count === 0 ? 'Zero' : this.staate.count
    }

}

export default Counter;