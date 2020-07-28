class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fruits: [],
        };
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this);

    }
    getFruits() {
        fetch('/api/v1/fruits.json')
            .then((response) => { return response.json() })
            .then((data) => { this.setState({ fruits: data }) });
    }
    componentDidMount() {
        this.getFruits()
    }
    handleFormSubmit(name, description) {
        console.log(name, description)
        let body = JSON.stringify({ fruit: { name: name, description: description } })
        fetch('http://localhost:3000/api/v1/fruits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body,
        }).then((response) => { return response.json() })
            .then((fruit) => {
                console.log("New fruit added: ", fruit);
            })
    }

    handleDelete(id) {
        fetch(`http://localhost:3000/api/v1/fruits/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                console.log('Item was deleted!')
                this.getFruits();
            })
    }

    handleUpdate(fruit) {
        fetch(`http://localhost:3000/api/v1/fruits/${fruit.id}`,
            {
                method: 'PUT',
                body: JSON.stringify({ fruit: fruit }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                this.setState({ size: this.state.fruits.size + 0 })
                this.getFruits()
            })

    }
    render() {
        return (
            <div>
                <NewFruit handleFormSubmit={this.handleFormSubmit} />
                <AllFruits fruits={this.state.fruits} handleDelete={this.handleDelete} handleUpdate={this.handleUpdate} />
            </div>
        )
    }
}