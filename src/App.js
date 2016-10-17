import React, { Component } from 'react';
import './App.css';
const client = require('./client');

class App extends Component {
  constructor(props) {
		super(props);
		this.state = {order: []};
	}
	componentDidMount() {
		client({method: 'GET', path: 'coiffeur.oryo.space/order'}).done(response => {
			this.setState({order: response.entity._embedded.order});
		});
	}

	render() {
		return (
			<OrderList order={this.state.order}/>
		)
	}
}

class OrderList extends React.Component{
	render() {
		var order = this.props.order.map(order =>
			<Order key={order._links.self.href} order={order}/>
		);
		return (
			<table>
				<tbody>
					<tr>
						<th>Order status</th>
						<th>Payment method</th>
						<th>Order date</th>
					</tr>
					{order}
				</tbody>
			</table>
		)
	}
}

class Order extends React.Component{
	render() {
		return (
			<tr>
				<td>{this.props.order.orderStatus}</td>
				<td>{this.props.order.paymentMethod}</td>
				<td>{this.props.order.orderDate}</td>
			</tr>
		)
	}
}
export default App;
