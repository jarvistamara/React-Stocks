import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
  state = {
    stocks: [],
    portfolioKeys: [],
    filter: 'All',
    sort: 'None'
  }

  componentDidMount() {
    const apiURL = 'http://localhost:3001/stocks'
    fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      this.setState({
        stocks: data
      })
    })
  }

  addToPortfolio = (id) => {
    if(!this.state.portfolioKeys.find(keyID => keyID === id)){
      this.setState({
        portfolioKeys: [...this.state.portfolioKeys, id]
      })
    }
  }

  removeFromPortfolio = (id) => {
    this.setState({
      portfolioKeys: [...this.state.portfolioKeys.filter(stock => stock !== id)]
    })
  }

  filterStocks = (id) => {

  }

  sortStocks = () => {

  }

  displayStocks = () => {
    let filteredStocks = [...this.state.stocks]
    if(this.state.filter !== 'All'){
      return filteredStocks = filteredStocks.filter(stock => stock.type === this.state.filter)
    } else if (this.state.sort === 'Alphabetically') {
          return filteredStocks.sort((a,b) => (a.name > b.name ? 1 : -1))
      } else if (this.state.price === 'Low to High') {
          return filteredStocks.sort((a,b) => (a.price > b.price ? -1 : 1))
        } else if (this.state.price === 'High to Low') {
          return filteredStocks.sort((a,b) => (a.price > b.price ? 1 : -1))
           } else {
             return filteredStocks
           }
  }



  render() {
    let displayStocks = this.displayStocks()
    let portfolioStocks = this.state.portfolioKeys.map(id => this.state.stocks.find(stock => stock.id === id))
    
    return (
      
      <div>
        <SearchBar/>

          <div className="row">
            <div className="col-8">

              <StockContainer stock={displayStocks} addPortfolio={this.addToPortfolio}/>

            </div>
            <div className="col-4">

              <PortfolioContainer stocks={portfolioStocks} clickHandler={this.removeFromPortfolio}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
